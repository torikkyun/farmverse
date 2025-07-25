import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserValidationMessages } from '../../common/constants/user-validation-msg';

export class EmailVerificationDto {
  @IsNotEmpty({ message: UserValidationMessages.EMAIL.NOT_EMPTY })
  @IsEmail({}, { message: UserValidationMessages.EMAIL.INVALID_FORMAT })
  @ApiProperty({
    example: 'farmer@gmail.com',
  })
  email: string;
}
