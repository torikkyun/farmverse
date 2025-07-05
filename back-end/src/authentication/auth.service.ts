import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { UsersService } from 'src/models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/providers/mail/mail.service';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/forgot-password.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByResetToken(
      resetPasswordDto.token,
    );
    if (
      !user ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      throw new BadRequestException('Token không hợp lệ hoặc đã hết hạn');
    }
    const hashPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.usersService.updatePasswordAndClearResetToken(
      user.id,
      hashPassword,
    );
    return { message: 'Đặt lại mật khẩu thành công' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      // Không tiết lộ user tồn tại hay không
      return {
        message: 'Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi.',
      };
    }
    const resetToken = randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 phút
    await this.usersService.setResetPasswordToken(
      user.id,
      resetToken,
      resetExpires,
    );
    await this.mailService.sendResetPasswordEmail(
      user.email,
      resetToken,
      user.name,
    );
    return {
      message: 'Nếu email tồn tại, hướng dẫn đặt lại mật khẩu đã được gửi.',
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Please verify your email first');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { id: user.id };
    const accessToken = this.jwtService.sign(payload);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return {
      accessToken,
      user: userWithoutPassword,
    };
  }

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const hashPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashPassword,
    });
    if (user.emailVerificationToken) {
      await this.mailService.sendEmailVerification(
        user.email,
        user.emailVerificationToken,
        user.name,
      );
    }
    // const payload = { id: user.id };
    // const accessToken = this.jwtService.sign(payload);

    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...userWithoutPassword } = user;

    // return { accessToken, user: userWithoutPassword };
    return {
      message:
        'Registration successful. Please check your email to verify your account.',
      email: user.email,
    };
  }

  async verifyEmail(token: string) {
    const user = await this.usersService.verifyEmail(token);
    if (!user) {
      throw new BadRequestException('Invalid or expired verification token');
    }

    // Gửi email chào mừng
    await this.mailService.sendWelcomeEmail(user.email, user.name);

    return { message: 'Email verified successfully' };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestException('Email already verified');
    }
    if (user.emailVerificationToken) {
      await this.mailService.sendEmailVerification(
        user.email,
        user.emailVerificationToken,
        user.name,
      );
    }
    return { message: 'Verification email sent' };
  }
}
