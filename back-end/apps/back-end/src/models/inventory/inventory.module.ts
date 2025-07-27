import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { PrismaService } from '@app/providers/prisma.service';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, PrismaService],
})
export class InventoryModule {}
