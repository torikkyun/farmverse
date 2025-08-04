import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { plainToInstance } from 'class-transformer';
import { Otp, User, UserRole } from 'generated/prisma';
import { randomBytes } from 'crypto';
import { AccountVerificationDto } from './dto/account-verification.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@shared/providers/prisma.service';
import { UserResponseDto } from '@app/common/dtos/response/user.dto';
import { MailClientService } from '@app/providers/queue/mail-client/mail-client.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailClientService: MailClientService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private createOtp(): { otp: string; expires: Date } {
    const otp = randomBytes(3).toString('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    return { otp, expires };
  }

  private async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  private async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(
    request: {
      ip: string;
      headers: { 'user-agent': string };
    },
    { email }: LoginDto,
  ): Promise<{
    message: string;
    accessToken: string;
    accessTokenExpiresIn: string;
    refreshToken: string;
    refreshTokenExpiresIn: string;
    user: UserResponseDto;
  }> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Email hoặc mật khẩu không đúng',
      });
    }

    const payload = { id: user.id, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);
    const accessTokenExpiresIn =
      this.configService.get<string>('JWT_EXPIRATION')!;

    const jwtRefreshExpiration = this.configService.get<string>(
      'JWT_REFRESH_EXPIRATION',
    )!;

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: jwtRefreshExpiration,
    });

    await this.prisma.session.create({
      data: {
        refreshToken,
        ipAddress: request.ip,
        userAgent: request.headers['user-agent'],
        expiresAt: new Date(Date.now() + parseInt(jwtRefreshExpiration) * 1000),
      },
    });

    return {
      message: 'Đăng nhập thành công',
      accessToken,
      accessTokenExpiresIn,
      refreshToken,
      refreshTokenExpiresIn: jwtRefreshExpiration,
      user: plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async register({ email, password, ...registerDto }: RegisterDto): Promise<{
    message: string;
    email: string;
  }> {
    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email đã tồn tại trong hệ thống');
    }

    const { otp, expires } = this.createOtp();
    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(registerDto.name)}`;

    const [user, _] = await this.prisma.$transaction([
      this.prisma.user.create({
        data: {
          email,
          password: hashPassword,
          avatar,
          ...registerDto,
        },
      }),
      this.prisma.otp.create({
        data: {
          email,
          otp: await bcrypt.hash(otp, 10),
          expiresAt: expires,
        },
      }),
    ]);

    await this.mailClientService.sendEmailVerification({
      email: user.email,
      name: user.name,
      otp,
    });

    return {
      message:
        'Email đăng ký thành công. Vui lòng kiểm tra hộp thư của bạn để xác thực tài khoản.',
      email: user.email,
    };
  }

  async verifyEmail({ email, otp }: AccountVerificationDto): Promise<{
    message: string;
    email: string;
  }> {
    const otpRecord = await this.prisma.otp.findFirst({
      where: {
        email,
        expiresAt: {
          gt: new Date(),
        },
        used: false,
      },
    });

    if (!otpRecord) {
      throw new BadRequestException('Mã xác thực đã hết hạn hoặc không hợp lệ');
    }

    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isOtpValid) {
      throw new BadRequestException('Mã xác thực không đúng');
    }

    const [_, user] = await this.prisma.$transaction([
      this.prisma.otp.update({
        where: { id: otpRecord.id },
        data: { used: true },
      }),
      this.prisma.user.update({
        where: { email: otpRecord.email },
        data: { emailVerified: true },
      }),
    ]);

    await this.mailClientService.sendWelcomeEmail({
      email: user.email,
      name: user.name,
    });

    return { message: 'Xác thực email thành công', email: user.email };
  }

  async resendVerificationEmail({ email }: EmailVerificationDto): Promise<{
    message: string;
    email: string;
  }> {
    const user = await this.findByEmail(email);
    const otpRecord = await this.prisma.otp.findFirst({
      where: {
        email,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    if (user.emailVerified) {
      throw new BadRequestException('Email đã được xác thực');
    }

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      const { otp, expires } = this.createOtp();
      await this.prisma.otp.create({
        data: {
          email,
          otp: await bcrypt.hash(otp, 10),
          expiresAt: expires,
        },
      });
      await this.mailClientService.sendEmailVerification({
        email,
        otp,
        name: user.name,
      });
    } else {
      await this.mailClientService.sendEmailVerification({
        email,
        otp: otpRecord.otp,
        name: user.name,
      });
    }

    return { message: 'Đã gửi lại email xác thực', email: user.email };
  }

  // async forgotPassword({ email }: EmailVerificationDto): Promise<{
  //   message: string;
  //   email: string;
  // }> {
  //   const existingUser = await this.findByEmail(email);

  //   if (!existingUser) {
  //     throw new BadRequestException('Không tìm thấy người dùng');
  //   }

  //   const { otp: resetPasswordOtp, expires: resetPasswordOtpExpires } =
  //     this.createOtp();

  //   const updatedUser = await this.prisma.user.update({
  //     where: { id: existingUser.id },
  //     data: {
  //       resetPasswordOtp,
  //       resetPasswordOtpExpires,
  //     },
  //   });

  //   if (!updatedUser.resetPasswordOtp) {
  //     throw new ConflictException(
  //       'Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn',
  //     );
  //   }

  //   await this.mailService.sendResetPasswordEmail(
  //     updatedUser.email,
  //     updatedUser.resetPasswordOtp,
  //     updatedUser.name,
  //   );

  //   return {
  //     message:
  //       'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn',
  //     email: updatedUser.email,
  //   };
  // }

  // async resetPassword({ otp, newPassword }: ResetPasswordDto): Promise<{
  //   message: string;
  //   email: string;
  // }> {
  //   const hashPassword = await bcrypt.hash(newPassword, 10);

  //   const user = await this.prisma.user.findFirst({
  //     where: {
  //       resetPasswordOtp: otp,
  //       resetPasswordOtpExpires: {
  //         gt: new Date(),
  //       },
  //     },
  //   });

  //   if (!user) {
  //     throw new NotFoundException('Không tìm thấy người dùng');
  //   }

  //   const updatedUser = await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: {
  //       password: hashPassword,
  //       resetPasswordOtp: null,
  //       resetPasswordOtpExpires: null,
  //     },
  //   });

  //   return { message: 'Đặt lại mật khẩu thành công', email: updatedUser.email };
  // }

  // async resendForgotPassword({ email }: EmailVerificationDto): Promise<{
  //   message: string;
  //   email: string;
  // }> {
  //   const user = await this.findByEmail(email);

  //   if (!user) {
  //     throw new BadRequestException('Không tìm thấy người dùng');
  //   }

  //   if (!user.resetPasswordOtp) {
  //     throw new BadRequestException('Không có mã đặt lại mật khẩu để gửi lại');
  //   }

  //   await this.mailService.sendResetPasswordEmail(
  //     user.email,
  //     user.resetPasswordOtp,
  //     user.name,
  //   );

  //   return { message: 'Đã gửi lại email đặt lại mật khẩu', email: user.email };
  // }

  async refreshToken({ refreshToken }: RefreshTokenDto): Promise<{
    message: string;
    accessToken: string;
    accessTokenExpiresIn: string;
    refreshToken: string;
    refreshTokenExpiresIn: string;
    user: UserResponseDto;
  }> {
    let payload: { id: string; role: UserRole };

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        ignoreExpiration: false,
      });
    } catch {
      throw new UnauthorizedException(
        'Refresh token không hợp lệ hoặc đã hết hạn',
      );
    }

    const user = await this.findById(payload.id);

    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }

    const accessPayload = { id: user.id, role: user.role };

    const accessToken = await this.jwtService.signAsync(accessPayload);
    const accessTokenExpiresIn =
      this.configService.get<string>('JWT_EXPIRATION')!;
    const refreshTokenExpiresIn = this.configService.get<string>(
      'JWT_REFRESH_EXPIRATION',
    )!;
    const newRefreshToken = await this.jwtService.signAsync(accessPayload, {
      expiresIn: refreshTokenExpiresIn,
    });

    return {
      message: 'Đăng nhập thành công',
      accessToken,
      accessTokenExpiresIn,
      refreshToken: newRefreshToken,
      refreshTokenExpiresIn,
      user: plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    };
  }
}
