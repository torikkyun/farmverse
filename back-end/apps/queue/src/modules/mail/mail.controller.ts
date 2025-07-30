import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('email_verification')
  async handleEmailVerification(
    @Payload() data: { email: string; name: string; otp: string },
  ) {
    await this.mailService.sendEmailVerification(data);
  }
}
