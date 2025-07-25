import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BlockchainService } from 'src/providers/blockchain.service';
import { PrismaService } from 'src/providers/prisma.service';
import { QueueProducer } from 'src/providers/queue/queue.producer';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    BlockchainService,
    PrismaService,
    QueueProducer,
  ],
})
export class TransactionsModule {}
