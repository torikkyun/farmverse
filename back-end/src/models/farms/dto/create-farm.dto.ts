import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Min,
} from 'class-validator';
import { FarmValidationMessages } from 'src/common/constants/farm-validation-msg';

export class CreateFarmDto {
  @IsString({ message: FarmValidationMessages.NAME.MUST_BE_STRING })
  @IsNotEmpty({ message: FarmValidationMessages.NAME.NOT_EMPTY })
  @MaxLength(50, { message: FarmValidationMessages.NAME.MAX_LENGTH })
  @MinLength(2, { message: FarmValidationMessages.NAME.MIN_LENGTH })
  @ApiProperty({
    example: 'Farmverse',
    required: true,
  })
  name: string;

  @IsOptional()
  @IsString({ message: FarmValidationMessages.DESCRIPTION.MUST_BE_STRING })
  @MaxLength(500, { message: FarmValidationMessages.DESCRIPTION.MAX_LENGTH })
  @ApiPropertyOptional({
    example: 'Trang trại nông nghiệp công nghệ cao',
    required: false,
  })
  description?: string;

  @IsString({ message: FarmValidationMessages.LOCATION.MUST_BE_STRING })
  @IsNotEmpty({ message: FarmValidationMessages.LOCATION.NOT_EMPTY })
  @MaxLength(100, { message: FarmValidationMessages.LOCATION.MAX_LENGTH })
  @MinLength(5, { message: FarmValidationMessages.LOCATION.MIN_LENGTH })
  @ApiProperty({
    example: 'Hà Nội, Việt Nam',
    required: true,
  })
  location: string;

  @IsNumber({}, { message: FarmValidationMessages.SIZE.MUST_BE_NUMBER })
  @IsNotEmpty({ message: FarmValidationMessages.SIZE.NOT_EMPTY })
  @Min(0.1, { message: FarmValidationMessages.SIZE.MIN_VALUE })
  @ApiProperty({
    example: 100,
    required: true,
  })
  size: number;

  @ApiProperty({
    required: true,
    type: [String],
    format: 'binary',
    description: 'Danh sách các ảnh của trang trại, tối đa 5 ảnh',
  })
  images: string[];
}
