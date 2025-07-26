import { Module } from '@nestjs/common';
import { RentedTreesService } from './rented-trees.service';
import { RentedTreesController } from './rented-trees.controller';
import { PrismaService } from '@app/providers/prisma.service';

@Module({
  controllers: [RentedTreesController],
  providers: [RentedTreesService, PrismaService],
})
export class RentedTreesModule {}
