import { Expose } from 'class-transformer';
import { TransactionStatus, TransactionType } from 'generated/prisma';
import { FarmResponseDto } from './farm.dto';
import { UserResponseDto } from './user.dto';

export class TransactionBaseResponseDto {
  @Expose()
  id: string;

  @Expose()
  totalPrice: number;

  @Expose()
  details?: any;

  @Expose()
  createdAt: Date;

  @Expose()
  type: TransactionType;
}

export class TransactionResponseDto extends TransactionBaseResponseDto {
  @Expose()
  transactionHash: string;

  @Expose()
  blockNumber: number;

  @Expose()
  fromAddress: string;

  @Expose()
  toAddress: string;

  @Expose()
  status: TransactionStatus;

  @Expose()
  contractImage?: string;

  @Expose()
  user: UserResponseDto;

  @Expose()
  farm: FarmResponseDto;
}
