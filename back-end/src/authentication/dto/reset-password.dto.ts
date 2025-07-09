import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserValidationMessages } from 'src/common/constants/user-validation-msg';
import { AccountVerificationDto } from './account-verification.dto';

export class ResetPasswordDto extends AccountVerificationDto {
  @IsNotEmpty({ message: UserValidationMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: UserValidationMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: UserValidationMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: UserValidationMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456789',
  })
  newPassword: string;
}
