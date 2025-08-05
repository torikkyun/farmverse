import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailClientService } from './services/mail-client.service';
import { TransactionClientService } from './services/transaction-client.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'FARMVERSE_QUEUE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')!],
            queue: 'farmverse_queue',
            queueOptions: { durable: true },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [MailClientService, TransactionClientService],
  exports: [MailClientService, TransactionClientService],
})
export class QueueModule {}
