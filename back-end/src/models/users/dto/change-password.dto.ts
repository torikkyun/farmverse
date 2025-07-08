import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { LoginDto } from 'src/authentication/dto/login.dto';
import { AuthMessages } from 'src/common/constants/validation-messages';

export class ChangePasswordDto extends LoginDto {
  @IsNotEmpty({ message: AuthMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: AuthMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: AuthMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: AuthMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456',
  })
  newPassword: string;

  @IsNotEmpty({ message: AuthMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: AuthMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: AuthMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: AuthMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456',
  })
  confirmNewPassword: string;
}
