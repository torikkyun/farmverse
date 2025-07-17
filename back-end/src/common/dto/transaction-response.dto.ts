import { Expose } from 'class-transformer';
import { TransactionType } from 'generated/prisma';
import { UserResponseDto } from './user-response.dto';
import { TransactionItemResponseDto } from './transaction-item-response.dto';

export class TransactionResponseDto {
  @Expose()
  id: string;

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

  @Expose()
  items?: TransactionItemResponseDto[];
}
