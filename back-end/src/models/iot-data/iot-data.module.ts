import { Module } from '@nestjs/common';
import { IotDataService } from './iot-data.service';
import { IotDataController } from './iot-data.controller';
import { PrismaService } from 'src/providers/prisma.service';

@Module({
  controllers: [IotDataController],
  providers: [IotDataService, PrismaService],
})
export class IotDataModule {}
