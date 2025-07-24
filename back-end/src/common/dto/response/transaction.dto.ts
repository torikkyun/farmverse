import { Expose } from 'class-transformer/types/decorators/expose.decorator';
import { TransactionType } from 'generated/prisma';
import { FarmResponseDto } from './farm.dto';

export class TransactionResponseDto {
  @Expose()
  id: string;

  @Expose()
  totalPrice: number;

  @Expose()
  transactionHash: string;

  @Expose()
  blockNumber: number;

  @Expose()
  fromAddress: string;

  @Expose()
  toAddress: string;

  @Expose()
  details?: any;

  @Expose()
  createdAt: Date;

  @Expose()
  type: TransactionType;

  @Expose()
  farm: FarmResponseDto;
}
