import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserMessages } from 'src/common/constants/validation-messages';

export class ResetPasswordDto {
  @IsNotEmpty({ message: UserMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: UserMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: UserMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: UserMessages.PASSWORD.MAX_LENGTH })
  @ApiProperty({
    example: '123456789',
  })
  newPassword: string;
}
