import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { BlockchainService } from '@app/providers/blockchain.service';
import { PrismaService } from '@app/providers/prisma.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { QueueService } from './queue.service';
// import { QueueService } from './queue.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
      expandVariables: true,
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService, BlockchainService, PrismaService],
})
export class QueueModule {}
