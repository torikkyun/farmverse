import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AuthMessages } from 'src/common/constants/validation-messages';

export class EmailVerificationDto {
  @IsNotEmpty({ message: AuthMessages.EMAIL.NOT_EMPTY })
  @IsEmail({}, { message: AuthMessages.EMAIL.INVALID_FORMAT })
  @ApiProperty({
    example: 'farmer@gmail.com',
  })
  email: string;
}
