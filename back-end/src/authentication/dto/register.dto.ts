import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserValidationMessages } from 'src/common/constants/user-validation-msg';
import { LoginDto } from './login.dto';
import { UserRole } from 'generated/prisma';

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: UserValidationMessages.NAME.NOT_EMPTY })
  @IsString({ message: UserValidationMessages.NAME.MUST_BE_STRING })
  @MaxLength(50, { message: UserValidationMessages.NAME.MAX_LENGTH })
  @MinLength(2, { message: UserValidationMessages.NAME.MIN_LENGTH })
  @ApiProperty({
    example: 'Trần Đình Phúc Đức',
  })
  name: string;

  @IsOptional()
  @IsString({ message: UserValidationMessages.PHONE.MUST_BE_STRING })
  @MaxLength(15, { message: UserValidationMessages.PHONE.MAX_LENGTH })
  @MinLength(10, { message: UserValidationMessages.PHONE.MIN_LENGTH })
  @ApiProperty({
    example: '0123456789',
  })
  phone?: string;

  @IsNotEmpty({ message: UserValidationMessages.ROLE.NOT_EMPTY })
  @IsString({ message: UserValidationMessages.ROLE.MUST_BE_STRING })
  @IsEnum(UserRole, {
    message: UserValidationMessages.ROLE.INVALID,
  })
  @ApiProperty({
    example: 'FARMER',
    enum: UserRole,
  })
  role: UserRole;
}
