import { Module } from '@nestjs/common';
import { ItemInstancesService } from './item-instances.service';
import { ItemInstancesController } from './item-instances.controller';

@Module({
  controllers: [ItemInstancesController],
  providers: [ItemInstancesService],
})
export class ItemInstancesModule {}
