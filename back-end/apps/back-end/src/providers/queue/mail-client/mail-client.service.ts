import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MailClientService {
  constructor(
    @Inject('FARMVERSE_QUEUE') private readonly client: ClientProxy,
  ) {}

  async sendEmailVerification(data: {
    email: string;
    name: string;
    otp: string;
  }): Promise<void> {
    await lastValueFrom(this.client.emit('email_verification', data));
  }

  async sendWelcomeEmail(data: { email: string; name: string }): Promise<void> {
    await lastValueFrom(this.client.emit('send_welcome_email', data));
  }
}
