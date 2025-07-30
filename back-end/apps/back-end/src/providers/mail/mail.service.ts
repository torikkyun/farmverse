import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MailService implements OnModuleInit {
  client: ClientProxy;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBITMQ_URL')!],
        queue: 'farmverse_queue',
        queueOptions: { durable: true },
      },
    });
  }

  async emailVerification(data: { email: string; name: string; otp: string }) {
    await lastValueFrom(this.client.emit('email_verification', data));
  }

  async sendWelcomeEmail(data: { email: string; name: string }) {
    await lastValueFrom(this.client.emit('send_welcome_email', data));
  }
}
