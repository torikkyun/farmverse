import { Expose } from 'class-transformer';
import { ItemType } from 'generated/prisma';

export class TransactionItemResponseDto {
  @Expose()
  itemId: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  images: string[];

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Expose()
  type: ItemType;

  @Expose()
  includesIot?: boolean;

  @Expose()
  startDate?: Date;

  @Expose()
  endDate?: Date;
}
