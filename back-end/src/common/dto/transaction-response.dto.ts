import { Expose } from 'class-transformer';
import { TransactionType } from 'generated/prisma';
import { UserResponseDto } from './user-response.dto';

export class TransactionResponseDto {
  @Expose()
  buyer: UserResponseDto;

  @Expose()
  totalPrice: number;

  @Expose()
  type: TransactionType;

  @Expose()
  transactionHash: string;

  @Expose()
  blockNumber: number;

  @Expose()
  fromAddress: string;

  @Expose()
  toAddress: string;
}
