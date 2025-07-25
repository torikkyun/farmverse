import { Expose } from 'class-transformer';
import { statusRentedTree } from 'generated/prisma';
import { FarmResponseDto } from './farm.dto';

export class RentedTreeResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  images: string[];

  @Expose()
  details: any;

  @Expose()
  schedule: any[];

  @Expose()
  cameraUrl?: string;

  @Expose()
  status: statusRentedTree;

  @Expose()
  totalProfit: number;

  @Expose()
  harvest: any[];

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  farm: FarmResponseDto;
}
