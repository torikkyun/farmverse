import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { EmailVerificationDto } from './email-verification.dto';

export class AccountVerificationDto extends EmailVerificationDto {
  @IsNotEmpty()
  @IsString()
  @Length(6, 6)
  @ApiProperty({
    example: 'b284ab',
    required: true,
  })
  otp: string;
}
