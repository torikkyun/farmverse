  async sendResetPasswordEmail(email: string, token: string, name: string) {
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
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
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmailVerification(email: string, token: string, name: string) {
    const verificationUrl = `${this.configService.get('FRONTEND_URL')}/api/auth/verify-email?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Xác thực email - FarmVerse',
      template: 'email-verification',
      context: {
        name,
        verificationUrl,
      },
    });
  }

  async sendWelcomeEmail(email: string, name: string) {
    const loginUrl = `${this.configService.get('FRONTEND_URL')}/api/auth/login`;

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
    const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
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
