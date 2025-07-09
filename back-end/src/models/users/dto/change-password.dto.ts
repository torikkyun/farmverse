import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { LoginDto } from 'src/authentication/dto/login.dto';
import { UserMessages } from 'src/common/constants/validation-messages';

export class ChangePasswordDto extends LoginDto {
  @IsNotEmpty({ message: UserMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: UserMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: UserMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: UserMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456',
  })
  newPassword: string;

  @IsNotEmpty({ message: UserMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: UserMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: UserMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: UserMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456',
  })
  confirmNewPassword: string;
}
