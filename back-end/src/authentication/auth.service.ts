import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  EmailVerificationDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { UsersService } from 'src/models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/providers/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException(
        'Vui lòng xác minh email của bạn trước khi đăng nhập',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Mật khẩu không chính xác');
    }

    const payload = { id: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }

  async register({ email, password, ...registerDto }: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email đã tồn tại trong hệ thống');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      password: hashPassword,
      ...registerDto,
    });

    if (user.emailVerificationToken) {
      await this.mailService.sendEmailVerification(
        user.email,
        user.emailVerificationToken,
        user.name,
      );
    }

    return {
      message:
        'Email đăng ký thành công. Vui lòng kiểm tra hộp thư của bạn để xác thực tài khoản.',
      email: user.email,
    };
  }

  async verifyEmail(token: string) {
    const user = await this.usersService.verifyEmail(token);

    if (!user) {
      throw new BadRequestException('Mã xác thực không hợp lệ hoặc đã hết hạn');
    }

    await this.mailService.sendWelcomeEmail(user.email, user.name);
    return { message: 'Xác thực email thành công', email: user.email };
  }

  async resendVerificationEmail({ email }: EmailVerificationDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email đã được xác thực');
    }

    if (!user.emailVerificationToken) {
      throw new BadRequestException('Người dùng không có mã xác thực email');
    }

    await this.mailService.sendEmailVerification(
      user.email,
      user.emailVerificationToken,
      user.name,
    );

    return { message: 'Đã gửi lại email xác thực', email: user.email };
  }

  async forgotPassword({ email }: EmailVerificationDto) {
    const existingUser = await this.usersService.findByEmail(email);

    if (!existingUser) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    const updatedUser = await this.usersService.setResetPasswordToken(
      existingUser.id,
    );

    if (updatedUser.resetPasswordToken) {
      await this.mailService.sendResetPasswordEmail(
        updatedUser.email,
        updatedUser.resetPasswordToken,
        updatedUser.name,
      );
    }

    return {
      message:
        'Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn',
      email: updatedUser.email,
    };
  }

  async resetPassword(token: string, { newPassword }: ResetPasswordDto) {
    const hashPassword = await bcrypt.hash(newPassword, 10);

    const user = await this.usersService.updatePasswordAndClearResetToken(
      token,
      hashPassword,
    );

    return { message: 'Đặt lại mật khẩu thành công', email: user.email };
  }

  async resendResetPassword({ email }: EmailVerificationDto) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    if (!user.resetPasswordToken) {
      throw new BadRequestException('Không có mã đặt lại mật khẩu để gửi lại');
    }

    await this.mailService.sendResetPasswordEmail(
      user.email,
      user.resetPasswordToken,
      user.name,
    );

    return { message: 'Đã gửi lại email đặt lại mật khẩu', email: user.email };
  }
}
