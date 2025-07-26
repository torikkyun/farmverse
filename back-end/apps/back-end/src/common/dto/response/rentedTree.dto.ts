import { Expose } from 'class-transformer';
import { statusRentedTree } from 'generated/prisma';
import { FarmResponseDto } from './farm.dto';

export class RentedTreeBaseResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  images: string[];

  @Expose()
  status: statusRentedTree;

  @Expose()
  totalProfit: number;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;
}

export class RentedTreeResponseDto extends RentedTreeBaseResponseDto {
  @Expose()
  harvest: any[];

  @Expose()
  details: any;

  @Expose()
  schedule: any[];

  @Expose()
  cameraUrl?: string;

  @Expose()
  farm: FarmResponseDto;
}
