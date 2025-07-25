import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
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

  @IsNotEmpty()
  @ApiProperty({
    example: {
      houseNumber: '10',
      street: 'Huỳnh Văn Nghệ',
      commune: 'Phường Trấn Biên',
      province: 'Đồng Nai',
      country: 'Việt Nam',
    },
  })
  address: any;

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
