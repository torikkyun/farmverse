import { ApiProperty } from '@nestjs/swagger';
import { ItemType } from 'generated/prisma';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { ItemValidationMessages } from 'src/common/constants/item-validation-msg';

export class CreateItemDto {
  @IsString({ message: ItemValidationMessages.NAME.MUST_BE_STRING })
  @IsNotEmpty({ message: ItemValidationMessages.NAME.NOT_EMPTY })
  @MaxLength(50, { message: ItemValidationMessages.NAME.MAX_LENGTH })
  @MinLength(2, { message: ItemValidationMessages.NAME.MIN_LENGTH })
  @ApiProperty()
  name: string;

  @IsNotEmpty({ message: ItemValidationMessages.TYPE.NOT_EMPTY })
  @IsEnum(ItemType, { message: ItemValidationMessages.TYPE.INVALID })
  @ApiProperty({ enum: ItemType })
  type: ItemType;

  @IsOptional()
  @IsString({ message: ItemValidationMessages.DESCRIPTION.MUST_BE_STRING })
  @MaxLength(500, { message: ItemValidationMessages.DESCRIPTION.MAX_LENGTH })
  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({
    type: [String],
    format: 'binary',
    required: true,
    description: 'Danh sách các ảnh của sản phẩm, tối đa 5 ảnh',
  })
  images: string[];

  @IsNotEmpty({ message: ItemValidationMessages.PRICE.NOT_EMPTY })
  @IsNumber({}, { message: ItemValidationMessages.PRICE.MUST_BE_NUMBER })
  @Min(1, { message: ItemValidationMessages.PRICE.MIN_VALUE })
  @ApiProperty()
  price: number;

  @IsNotEmpty({ message: ItemValidationMessages.QUANTITY.NOT_EMPTY })
  @IsNumber({}, { message: ItemValidationMessages.QUANTITY.MUST_BE_NUMBER })
  @Min(0, { message: ItemValidationMessages.QUANTITY.MIN_VALUE })
  @ApiProperty({ required: true })
  quantity: number;
}
