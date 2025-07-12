import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { FarmResponseDto } from './farm-response.dto';

export class ScheduleResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  tasks: string[];

  @Expose()
  @Type(() => FarmResponseDto)
  @ApiProperty({ type: FarmResponseDto })
  farm: FarmResponseDto;
}
