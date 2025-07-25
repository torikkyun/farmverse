import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class QueueProducer implements OnModuleInit {
  client: ClientProxy;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBITMQ_URL')!],
        queue: 'blockchain_queue',
        queueOptions: { durable: true },
      },
    });
  }

  async deposit(data: {
    transactionId: string;
    userId: string;
    amount: number;
  }) {
    await lastValueFrom(this.client.emit('deposit', data));
  }
}
