import { Module } from '@nestjs/common';
import { ItemInstancesService } from './item-instances.service';
import { ItemInstancesController } from './item-instances.controller';
import { PrismaService } from 'src/providers/prisma.service';

@Module({
  controllers: [ItemInstancesController],
  providers: [ItemInstancesService, PrismaService],
})
export class ItemInstancesModule {}
