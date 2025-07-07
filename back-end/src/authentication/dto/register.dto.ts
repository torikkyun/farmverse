import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AuthMessages } from 'src/common/constants/validation-messages';
import { LoginDto } from './login.dto';
import { UserRole } from 'generated/prisma';

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
