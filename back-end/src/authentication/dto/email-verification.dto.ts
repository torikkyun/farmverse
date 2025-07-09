import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserMessages } from 'src/common/constants/validation-messages';

export class EmailVerificationDto {
  @IsNotEmpty({ message: UserMessages.EMAIL.NOT_EMPTY })
  @IsEmail({}, { message: UserMessages.EMAIL.INVALID_FORMAT })
  @ApiProperty({
    example: 'farmer@gmail.com',
  })
  email: string;
}
