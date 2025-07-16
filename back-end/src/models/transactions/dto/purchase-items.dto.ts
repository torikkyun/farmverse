import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class PurchaseItemDto {
  @IsString()
  @ApiProperty({ required: true })
  itemId: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false })
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  includesIot?: boolean;
}

export class PurchaseItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  @ApiProperty({ type: [PurchaseItemDto], required: true })
  items: PurchaseItemDto[];
}
