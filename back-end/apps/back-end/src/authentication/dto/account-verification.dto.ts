import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { EmailVerificationDto } from './email-verification.dto';

export class AccountVerificationDto extends EmailVerificationDto {
  @IsNotEmpty({ message: 'OTP không được để trống' })
  @IsString({ message: 'OTP phải là một chuỗi' })
  @Length(6, 6, { message: 'OTP phải có độ dài 6 ký tự' })
  @ApiProperty({
    example: 'b284ab',
    required: true,
  })
  otp: string;
}
