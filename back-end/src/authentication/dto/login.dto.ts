import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { UserMessages } from 'src/common/constants/validation-messages';
import { EmailVerificationDto } from './email-verification.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';

export class LoginDto extends EmailVerificationDto {
  @IsNotEmpty({ message: UserMessages.PASSWORD.NOT_EMPTY })
  @IsString({ message: UserMessages.PASSWORD.MUST_BE_STRING })
  @MinLength(6, { message: UserMessages.PASSWORD.MIN_LENGTH })
  @MaxLength(15, { message: UserMessages.PASSWORD.MAX_LENGTH })
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

  @ApiProperty({
    type: UserResponseDto,
  })
  user: UserResponseDto;
}
