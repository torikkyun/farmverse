import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ScheduleValidationMessages } from 'src/common/constants/schedule-validation-msg';

export class CreateScheduleDto {
  @IsNotEmpty({ message: ScheduleValidationMessages.NAME.NOT_EMPTY })
  @IsString({ message: ScheduleValidationMessages.NAME.MUST_BE_STRING })
  @MaxLength(50, {
    message: ScheduleValidationMessages.NAME.MAX_LENGTH,
  })
  @MinLength(2, {
    message: ScheduleValidationMessages.NAME.MIN_LENGTH,
  })
  @ApiProperty({
    required: true,
    type: String,
    example: 'Lịch trình 1',
  })
  name: string;

  @IsOptional()
  @IsString({ message: ScheduleValidationMessages.DESCRIPTION.MUST_BE_STRING })
  @MaxLength(500, {
    message: ScheduleValidationMessages.DESCRIPTION.MAX_LENGTH,
  })
  @ApiProperty({
    required: false,
    type: String,
    example: 'Mô tả lịch trình 1',
  })
  description: string;

  @IsNotEmpty({ message: ScheduleValidationMessages.START_TIME.NOT_EMPTY })
  @IsDate({ message: ScheduleValidationMessages.START_TIME.MUST_BE_DATE })
  @ApiProperty({
    required: true,
    type: Date,
    example: '2023-01-01T00:00:00.000Z',
  })
  startTime: Date;

  @IsNotEmpty({ message: ScheduleValidationMessages.END_TIME.NOT_EMPTY })
  @IsDate({ message: ScheduleValidationMessages.END_TIME.MUST_BE_DATE })
  @ApiProperty({
    required: true,
    type: Date,
    example: '2023-01-02T00:00:00.000Z',
  })
  endTime: Date;

  @IsBoolean({ message: ScheduleValidationMessages.STATUS.MUST_BE_BOOLEAN })
  @ApiProperty({
    required: true,
    type: Boolean,
    example: true,
  })
  status: boolean;
}
