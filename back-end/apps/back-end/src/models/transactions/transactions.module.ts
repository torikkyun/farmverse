import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { BlockchainService } from '@app/providers/blockchain.service';
import { PrismaService } from '@app/providers/prisma.service';
import { QueueService } from '@app/providers/queue/queue.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    BlockchainService,
    PrismaService,
    QueueService,
  ],
})
export class TransactionsModule {}
