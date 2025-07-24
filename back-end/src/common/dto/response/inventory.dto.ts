import { Expose } from 'class-transformer';
import { ItemType } from 'generated/prisma';

export class InventoryResponseDto {
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
  stock: number;

  @Expose()
  details: any;
}
