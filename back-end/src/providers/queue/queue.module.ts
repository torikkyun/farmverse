import { Module } from '@nestjs/common';
import { QueueProducer } from './queue.producer';
import { QueueConsumer } from './queue.consumer';
import { BlockchainService } from '../blockchain.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [QueueProducer, QueueConsumer, BlockchainService, PrismaService],
  exports: [QueueProducer],
})
export class QueueModule {}
