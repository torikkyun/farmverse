import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly frontendUrl: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL')!;
    this.frontendUrl = frontendUrl;
  }

  async sendEmailVerification({
    email,
    name,
    otp,
  }: {
    email: string;
    name: string;
    otp: string;
  }) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Xác thực tài khoản - FarmVerse',
      template: 'email-verification',
      context: {
        name,
        otp,
      },
    });
  }

  async sendWelcomeEmail({ email, name }: { email: string; name: string }) {
    const loginUrl = `${this.frontendUrl}/login`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Chào mừng đến với FarmVerse!',
      template: 'welcome',
      context: {
        name,
        loginUrl,
      },
    });
  }

  async sendResetPasswordEmail(email: string, token: string, name: string) {
    const resetUrl = `${this.frontendUrl}/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Đặt lại mật khẩu - FarmVerse',
      template: 'reset-password',
      context: {
        name,
        resetUrl,
      },
    });
  }
}
