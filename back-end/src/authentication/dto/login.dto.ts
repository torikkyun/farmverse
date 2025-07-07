import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthMessages } from 'src/common/constants/validation-messages';
import { EmailVerificationDto } from './email-verification.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';

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

export class LoginResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  user: UserResponseDto;
}
