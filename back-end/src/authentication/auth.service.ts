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
import { MailService } from 'src/providers/mail/mail.service';
import { RegisterDto } from './dto/register.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/providers/prisma.service';
import { randomBytes } from 'crypto';
import { AccountVerificationDto } from './dto/account-verification.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}

  private createOtp(): { otp: string; expires: Date } {
    const otp = randomBytes(3).toString('hex');
    const expires = new Date(Date.now() + 15 * 60 * 1000);
    return { otp, expires };
  }

  private async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async login({ email }: LoginDto): Promise<{
    message: string;
    accessToken: string;
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

    return {
      message: 'Đăng nhập thành công',
      accessToken,
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

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashPassword,
        ...registerDto,
        otp,
        otpExpires: expires,
      },
    });

    if (!user.otp) {
      throw new ConflictException(
        'Không thể tạo tài khoản. Vui lòng thử lại sau',
      );
    }

    await this.mailService.sendEmailVerification(
      user.email,
      user.otp,
      user.name,
    );

    return {
      message:
        'Email đăng ký thành công. Vui lòng kiểm tra hộp thư của bạn để xác thực tài khoản.',
      email: user.email,
    };
  }

  async verifyEmail({ otp }: AccountVerificationDto): Promise<{
    message: string;
    email: string;
  }> {
    const user = await this.prisma.user.findFirst({
      where: {
        otp: otp,
        otpExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new BadRequestException('Mã xác thực không hợp lệ hoặc đã hết hạn');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        otp: null,
        otpExpires: null,
      },
    });

    await this.mailService.sendWelcomeEmail(user.email, user.name);
    return { message: 'Xác thực email thành công', email: user.email };
  }

  async resendVerificationEmail({ email }: EmailVerificationDto): Promise<{
    message: string;
    email: string;
  }> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email đã được xác thực');
    }

    if (!user.otp) {
      throw new BadRequestException('Người dùng không có mã xác thực email');
    }

    await this.mailService.sendEmailVerification(
      user.email,
      user.otp,
      user.name,
    );

    return { message: 'Đã gửi lại email xác thực', email: user.email };
  }

  async forgotPassword({ email }: EmailVerificationDto): Promise<{
    message: string;
    email: string;
  }> {
    const existingUser = await this.findByEmail(email);

    if (!existingUser) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    const { otp: resetPasswordOtp, expires: resetPasswordOtpExpires } =
      this.createOtp();

    const updatedUser = await this.prisma.user.update({
      where: { id: existingUser.id },
      data: {
        resetPasswordOtp,
        resetPasswordOtpExpires,
      },
    });

    if (!updatedUser.resetPasswordOtp) {
      throw new ConflictException(
        'Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn',
      );
    }

    await this.mailService.sendResetPasswordEmail(
      updatedUser.email,
      updatedUser.resetPasswordOtp,
      updatedUser.name,
    );

    return {
      message:
        'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn',
      email: updatedUser.email,
    };
  }

  async resetPassword({ otp, newPassword }: ResetPasswordDto): Promise<{
    message: string;
    email: string;
  }> {
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordOtp: otp,
        resetPasswordOtpExpires: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashPassword,
        resetPasswordOtp: null,
        resetPasswordOtpExpires: null,
      },
    });

    return { message: 'Đặt lại mật khẩu thành công', email: updatedUser.email };
  }

  async resendForgotPassword({ email }: EmailVerificationDto): Promise<{
    message: string;
    email: string;
  }> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    if (!user.resetPasswordOtp) {
      throw new BadRequestException('Không có mã đặt lại mật khẩu để gửi lại');
    }

    await this.mailService.sendResetPasswordEmail(
      user.email,
      user.resetPasswordOtp,
      user.name,
    );

    return { message: 'Đã gửi lại email đặt lại mật khẩu', email: user.email };
  }
}
