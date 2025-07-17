import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FarmResponseDto } from './farm-response.dto';
import { TransactionItemResponseDto } from './transaction-item-response.dto';

export class ScheduleResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description: string;

  @Expose()
  @ApiProperty()
  startTime: Date;

  @Expose()
  @ApiProperty()
  endTime: Date;

  @Expose()
  @ApiProperty()
  status: boolean;

  @Expose()
  @Type(() => FarmResponseDto)
  @ApiProperty({ type: FarmResponseDto })
  farm: FarmResponseDto;

  @Expose()
  @Type(() => TransactionItemResponseDto)
  item?: TransactionItemResponseDto;
}
