import { Expose } from 'class-transformer';
import { TransactionType } from 'generated/prisma';
import { FarmResponseDto } from './farm.dto';
import { UserResponseDto } from './user.dto';

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
  user: UserResponseDto;

  @Expose()
  farm: FarmResponseDto;
}
