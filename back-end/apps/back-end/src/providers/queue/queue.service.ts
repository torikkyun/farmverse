import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ContractQueuePayload } from '@app/common/types/contract-payload.type';

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

  async contract(data: ContractQueuePayload) {
    await lastValueFrom(this.client.emit('contract', data));
  }

  async purchaseItems(data: {
    transactionId: string;
    userId: string;
    items: any[];
    totalPrice: number;
  }) {
    await lastValueFrom(this.client.emit('purchase_items', data));
  }
}
