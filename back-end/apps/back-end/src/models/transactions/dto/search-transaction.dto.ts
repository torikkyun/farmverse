import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '@app/common/dto/pagination.dto';
import { IsOptional } from 'class-validator';
import { TransactionType } from 'generated/prisma';

export class SearchTransactionsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    enum: TransactionType,
  })
  type?: TransactionType;
}
