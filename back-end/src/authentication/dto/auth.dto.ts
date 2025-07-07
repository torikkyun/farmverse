import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'generated/prisma';
import { ValidationMessages } from 'src/common/constants/validation-messages';

export class LoginDto {
  @IsNotEmpty({ message: ValidationMessages.EMAIL.NOT_EMPTY })
  @IsEmail({}, { message: ValidationMessages.EMAIL.INVALID_FORMAT })
  @ApiProperty({
    example: 'farmer@gmail.com',
  })
  email: string;

  @IsNotEmpty({ message: ValidationMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: ValidationMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: ValidationMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: ValidationMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456',
  })
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: ValidationMessages.NAME.NOT_EMPTY })
  @IsString({ message: ValidationMessages.NAME.MUST_BE_STRING })
  @ApiProperty({
    example: 'Trần Đình Phúc Đức',
  })
  name: string;

  @IsOptional()
  @IsString({ message: ValidationMessages.PHONE.MUST_BE_STRING })
  @MaxLength(15, { message: ValidationMessages.PHONE.MAX_LENGTH })
  @ApiProperty({
    example: '0123456789',
  })
  phone: string;

  @IsNotEmpty({ message: ValidationMessages.ROLE.NOT_EMPTY })
  @IsString({ message: ValidationMessages.ROLE.MUST_BE_STRING })
  @IsEnum(UserRole, {
    message: ValidationMessages.ROLE.INVALID,
  })
  @ApiProperty({
    example: 'FARMER',
    enum: UserRole,
  })
  role: UserRole;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
  })
  avatar?: string;
}
