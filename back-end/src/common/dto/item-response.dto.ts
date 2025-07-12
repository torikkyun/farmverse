import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ItemType } from 'generated/prisma';
import { FarmResponseDto } from './farm-response.dto';

export class ItemResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty({ enum: ItemType })
  type: ItemType;

  @Expose()
  @ApiProperty()
  description?: string;

  @Expose()
  @ApiProperty({ type: [String] })
  images: string[];

  @Expose()
  @ApiProperty()
  price: number;

  @Expose()
  @ApiProperty()
  quantity?: number;

  @Expose()
  @ApiProperty({ type: FarmResponseDto })
  @Type(() => FarmResponseDto)
  farm: FarmResponseDto;
}
