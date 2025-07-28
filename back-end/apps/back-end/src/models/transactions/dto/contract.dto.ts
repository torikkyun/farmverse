import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
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

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ required: true })
  includesIot: boolean;

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
}

export class ContractDto {
  @ValidateNested({ each: true })
  @Type(() => TreeDto)
  @ApiProperty({ type: [TreeDto], required: true })
  items: TreeDto[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  totalPrice: number;
}
