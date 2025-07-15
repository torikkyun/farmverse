import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserValidationMessages } from 'src/common/constants/user-validation-msg';

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
  @IsString({ message: UserValidationMessages.PHONE.MUST_BE_STRING })
  @MaxLength(15, { message: UserValidationMessages.PHONE.MAX_LENGTH })
  @MinLength(10, { message: UserValidationMessages.PHONE.MIN_LENGTH })
  @ApiProperty({
    example: '0123456789',
    required: false,
  })
  phone?: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  })
  avatar?: any;
}
