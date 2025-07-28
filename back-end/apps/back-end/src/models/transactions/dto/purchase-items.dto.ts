import { ApiProperty } from '@nestjs/swagger';
import { ItemType } from 'generated/prisma';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class PesticideDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  activeIngredient: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  concentration: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  usage: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  applicationMethod: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  targetPests: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  expirationDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  preHarvestIntervalDays: number;
}

export class FertilizerDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  formula: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  nitrogen: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  phosphorus: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  potassium: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  usage: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  weightKg: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  applicationStage: string;
}

export class ItemDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  itemId: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @IsEnum(ItemType)
  @ApiProperty({ required: true, enum: ItemType })
  type: ItemType;

  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  images: string[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  price: number;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty({
    required: true,
  })
  detail: FertilizerDto | PesticideDto;
}

export class PurchaseItemsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @ApiProperty({ type: [ItemDto], required: true })
  items: ItemDto[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true })
  totalPrice: number;
}
