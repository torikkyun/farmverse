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
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    if (!frontendUrl) {
      throw new Error('FRONTEND_URL is not defined in the configuration');
    }
    this.frontendUrl = frontendUrl;
  }

  async sendEmailVerification(email: string, otp: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Xác thực email - FarmVerse',
      template: 'email-verification',
      context: {
        name,
        otp,
      },
    });
  }

  async sendWelcomeEmail(email: string, name: string) {
    const loginUrl = `${this.frontendUrl}`;
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
