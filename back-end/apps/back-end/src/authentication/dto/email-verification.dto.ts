import { UserValidationMessages } from '@app/common/constants/user-validation-msg';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailVerificationDto {
  @IsNotEmpty({ message: UserValidationMessages.EMAIL.NOT_EMPTY })
  @IsEmail({}, { message: UserValidationMessages.EMAIL.INVALID_FORMAT })
  @ApiProperty({
    example: 'hoangminh0701@gmail.com',
  })
  email: string;
}
