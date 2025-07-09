import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserMessages } from 'src/common/constants/validation-messages';
import { LoginDto } from './login.dto';
import { UserRole } from 'generated/prisma';

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: UserMessages.NAME.NOT_EMPTY })
  @IsString({ message: UserMessages.NAME.MUST_BE_STRING })
  @MaxLength(50, { message: UserMessages.NAME.MAX_LENGTH })
  @MinLength(2, { message: UserMessages.NAME.MIN_LENGTH })
  @ApiProperty({
    example: 'Trần Đình Phúc Đức',
  })
  name: string;

  @IsOptional()
  @IsString({ message: UserMessages.PHONE.MUST_BE_STRING })
  @MaxLength(15, { message: UserMessages.PHONE.MAX_LENGTH })
  @MinLength(10, { message: UserMessages.PHONE.MIN_LENGTH })
  @ApiProperty({
    example: '0123456789',
  })
  phone?: string;

  @IsNotEmpty({ message: UserMessages.ROLE.NOT_EMPTY })
  @IsString({ message: UserMessages.ROLE.MUST_BE_STRING })
  @IsEnum(UserRole, {
    message: UserMessages.ROLE.INVALID,
  })
  @ApiProperty({
    example: 'FARMER',
    enum: UserRole,
  })
  role: UserRole;
}
