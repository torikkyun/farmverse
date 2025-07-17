import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class PurchaseItemDto {
  @IsString()
  @ApiProperty({ required: true })
  itemId: string;

  @IsNumber()
  @ApiProperty({ required: true })
  quantity: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  includesIot?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: false })
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: false })
  endDate?: Date;
}

export class PurchaseItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseItemDto)
  @ApiProperty({ type: [PurchaseItemDto], required: true })
  items: PurchaseItemDto[];
}
