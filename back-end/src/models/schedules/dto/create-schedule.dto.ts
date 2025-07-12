import { IsArray, ArrayNotEmpty, IsString } from 'class-validator';
import { ScheduleValidationMessages } from '../../../common/constants/schedule-validation-msg';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @IsArray({ message: ScheduleValidationMessages.TASKS.MUST_BE_ARRAY })
  @ArrayNotEmpty({ message: ScheduleValidationMessages.TASKS.NOT_EMPTY })
  @IsString({
    each: true,
    message: ScheduleValidationMessages.TASKS.MUST_BE_STRING,
  })
  @ApiProperty({
    type: [String],
    example: ['task1', 'task2'],
  })
  tasks: string[];
}
