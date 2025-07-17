import { Expose, Type } from 'class-transformer';
import { ItemResponseDto } from './item-response.dto';
import { ItemType, TreeRootInstanceStatus } from 'generated/prisma';
import { FarmResponseDto } from './farm-response.dto';

export class ItemInstanceResponseDto {
  @Expose()
  id: string;

  @Expose()
  type: ItemType;

  @Expose()
  quantity: number;

  @Expose()
  status: TreeRootInstanceStatus;

  @Expose()
  cameraUrl: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  @Type(() => ItemResponseDto)
  item: ItemResponseDto;

  @Expose()
  @Type(() => FarmResponseDto)
  farm: FarmResponseDto;
}
