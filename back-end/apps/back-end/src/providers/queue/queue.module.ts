import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { PrismaService } from '../prisma.service';
import { BlockchainService } from '../blockchain.service';

@Module({
  providers: [QueueService, BlockchainService, PrismaService],
  exports: [QueueService],
})
export class QueueModule {}
