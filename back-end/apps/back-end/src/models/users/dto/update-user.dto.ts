import { UserValidationMessages } from '@app/common/constants/user-validation-msg';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: UserValidationMessages.NAME.MUST_BE_STRING })
  @MaxLength(50, { message: UserValidationMessages.NAME.MAX_LENGTH })
  @MinLength(2, { message: UserValidationMessages.NAME.MIN_LENGTH })
  @ApiProperty({
    example: 'John Doe',
    required: false,
  })
  name?: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  avatar?: any;
}
