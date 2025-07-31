import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('email_verification')
  async handleEmailVerification(
    @Payload() data: { email: string; name: string; otp: string },
  ): Promise<void> {
    await this.mailService.sendEmailVerification(data);
  }

  @MessagePattern('send_welcome_email')
  async handleSendWelcomeEmail(
    @Payload() data: { email: string; name: string },
  ): Promise<void> {
    await this.mailService.sendWelcomeEmail(data);
  }
}
