import { Expose } from 'class-transformer';
import { ItemType } from 'generated/prisma';
import { FarmResponseDto } from './farm.dto';

export class ItemResponseDto {
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

  @Expose()
  details: any;

  @Expose()
  farm: FarmResponseDto;
}
