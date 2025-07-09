import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UserValidationMessages } from 'src/common/constants/user-validation-msg';
import { EmailVerificationDto } from './email-verification.dto';

export class AccountVerificationDto extends EmailVerificationDto {
  @IsNotEmpty({ message: UserValidationMessages.OTP.NOT_EMPTY })
  @IsString({ message: UserValidationMessages.OTP.MUST_BE_STRING })
  @Length(6, 6, { message: UserValidationMessages.OTP.LENGTH })
  @ApiProperty({
    example: 'b284ab',
    required: true,
  })
  otp: string;
}
