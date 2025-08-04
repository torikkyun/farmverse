import { Expose } from 'class-transformer';
import { ItemType } from 'generated/prisma';
import { FarmResponseDto } from './farm.dto';

export class ItemBaseResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: ItemType;

  @Expose()
  description?: string;

  @Expose()
  images: string[];

  @Expose()
  price: number;

  @Expose()
  stock: number;
}

export class ItemResponseDto extends ItemBaseResponseDto {
  @Expose()
  details: any;

  @Expose()
  farm: FarmResponseDto;
}
