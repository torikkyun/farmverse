import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class DepositDto {
  @IsNumber({}, { message: 'amount phải là một số' })
  @Min(1, { message: 'amount phải lớn hơn hoặc bằng 1' })
  @ApiProperty({ required: true })
  amount: number;
}
