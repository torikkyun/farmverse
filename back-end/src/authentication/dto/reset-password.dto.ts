import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthMessages } from 'src/common/constants/validation-messages';

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
