import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class TreeDto {
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

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: true })
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ type: Date, required: true })
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  totalPrice: number;
}

export class ContractDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TreeDto)
  @ApiProperty({ type: [TreeDto], required: true })
  items: TreeDto[];
}
