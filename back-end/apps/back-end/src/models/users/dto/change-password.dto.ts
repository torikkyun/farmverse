import { LoginDto } from '@app/authentication/dto/login.dto';
import { UserValidationMessages } from '@app/common/constants/user-validation-msg';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto extends LoginDto {
  @IsNotEmpty({ message: UserValidationMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: UserValidationMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: UserValidationMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: UserValidationMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456',
  })
  newPassword: string;

  @IsNotEmpty({ message: UserValidationMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: UserValidationMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: UserValidationMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: UserValidationMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456',
  })
  confirmNewPassword: string;
}
