import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Matches,
  ValidateNested,
} from 'class-validator';

class TreeDto {
  @IsString()
  @ApiProperty({ required: true, example: '6882de9da2a432267d0d98dd' })
  itemId: string;

  @IsNumber()
  @ApiProperty({ required: true, example: 2 })
  quantity: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ required: true, example: true })
  iot: boolean;
}

export class ContractDto {
  @IsString()
  @ApiProperty({ required: true, example: 'Sầu riêng Hoàng Minh' })
  lessorName: string;

  @IsString()
  @ApiProperty({
    required: true,
    example: '45 Nguyễn Văn Linh, Củ Chi, Hồ Chí Minh',
  })
  lessorAddress: string;

  @IsString()
  @ApiProperty({ required: true, example: 'hoangminh0701@gmail.com' })
  lessorEmail: string;

  @IsString()
  @ApiProperty({ required: true, example: 'John Doe' })
  lesseeName: string;

  @IsString()
  @ApiProperty({ required: true })
  lesseeAddress: string;

  @IsString()
  @ApiProperty({ required: true })
  lesseeEmail: string;

  @IsArray()
  @ApiProperty({ type: [String], required: true })
  treeNames: string[];

  @IsNumber()
  @ApiProperty({ required: true, example: 2 })
  totalTree: number;

  @IsString()
  @ApiProperty({
    required: true,
    example: '45 Nguyễn Văn Linh, Củ Chi, Hồ Chí Minh',
  })
  farmAddress: string;

  @IsString()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'startDate phải có định dạng dd-mm-yyyy',
  })
  @ApiProperty({ required: true, example: '30-07-2025' })
  startDate: string;

  @IsString()
  @Matches(/^\d{2}-\d{2}-\d{4}$/, {
    message: 'endDate phải có định dạng dd-mm-yyyy',
  })
  @ApiProperty({ required: true, example: '30-07-2026' })
  endDate: string;

  @IsNumber()
  @ApiProperty({ required: true, example: 1500 })
  totalPrice: number;

  @IsNumber()
  @ApiProperty({ required: true, example: 30 })
  currentDate: number;

  @IsNumber()
  @ApiProperty({ required: true, example: 7 })
  currentMonth: number;

  @IsNumber()
  @ApiProperty({ required: true, example: 2025 })
  currentYear: number;

  @IsString()
  @IsUrl()
  @ApiProperty({
    required: true,
    example: 'signature-a',
  })
  lessorSignature: string;

  @IsString()
  @IsUrl()
  @ApiProperty({
    required: true,
    example: 'signature-a',
  })
  lesseeSignature: string;
}

export class CreateContractDto {
  @ValidateNested({ each: true })
  @Type(() => TreeDto)
  @ApiProperty({ type: [TreeDto], required: true })
  items: TreeDto[];

  @IsNotEmpty()
  @ApiProperty({ type: ContractDto, required: true })
  contract: ContractDto;
}
