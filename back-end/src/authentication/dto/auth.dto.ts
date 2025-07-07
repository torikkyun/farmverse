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
import { AuthMessages } from 'src/common/constants/validation-messages';

export class EmailVerificationDto {
  @IsNotEmpty({ message: AuthMessages.EMAIL.NOT_EMPTY })
  @IsEmail({}, { message: AuthMessages.EMAIL.INVALID_FORMAT })
  @ApiProperty({
    example: 'farmer@gmail.com',
  })
  email: string;
}

export class LoginDto extends EmailVerificationDto {
  @IsNotEmpty({ message: AuthMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: AuthMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: AuthMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: AuthMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456',
  })
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: AuthMessages.NAME.NOT_EMPTY })
  @IsString({ message: AuthMessages.NAME.MUST_BE_STRING })
  @ApiProperty({
    example: 'Trần Đình Phúc Đức',
  })
  name: string;

  @IsOptional()
  @IsString({ message: AuthMessages.PHONE.MUST_BE_STRING })
  @MaxLength(15, { message: AuthMessages.PHONE.MAX_LENGTH })
  @MinLength(10, { message: AuthMessages.PHONE.MIN_LENGTH })
  @ApiProperty({
    example: '0123456789',
  })
  phone: string;

  @IsNotEmpty({ message: AuthMessages.ROLE.NOT_EMPTY })
  @IsString({ message: AuthMessages.ROLE.MUST_BE_STRING })
  @IsEnum(UserRole, {
    message: AuthMessages.ROLE.INVALID,
  })
  @ApiProperty({
    example: 'FARMER',
    enum: UserRole,
  })
  role: UserRole;
}

export class ResetPasswordDto {
  @IsNotEmpty({ message: AuthMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: AuthMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: AuthMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: AuthMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456789',
  })
  newPassword: string;
}
