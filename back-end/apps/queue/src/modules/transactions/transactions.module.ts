import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from '@app/providers/prisma.service';
import { BlockchainService } from '@queue/providers/blockchain.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, BlockchainService, PrismaService],
})
export class TransactionsModule {}
