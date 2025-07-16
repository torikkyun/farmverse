import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DepositDto {
  @IsNumber()
  @ApiProperty({ required: true })
  amount: number;
}
