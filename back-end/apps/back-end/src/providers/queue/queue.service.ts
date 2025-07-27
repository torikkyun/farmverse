import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class QueueService implements OnModuleInit {
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

  async deposit(data: {
    transactionId: string;
    userId: string;
    amount: number;
  }) {
    await lastValueFrom(this.client.emit('deposit', data));
  }

  async contract(data: {
    transactionId: string;
    userId: string;
    items: {
      itemId: string;
      quantity: number;
      includesIot: boolean;
      startDate: Date;
      endDate: Date;
    }[];
    contractImage: Express.Multer.File;
  }) {
    await lastValueFrom(this.client.emit('contract', data));
  }
}
