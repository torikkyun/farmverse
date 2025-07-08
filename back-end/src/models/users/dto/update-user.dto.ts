import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthMessages } from 'src/common/constants/validation-messages';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: AuthMessages.NAME.MUST_BE_STRING })
  @MaxLength(50, { message: AuthMessages.NAME.MAX_LENGTH })
  @MinLength(2, { message: AuthMessages.NAME.MIN_LENGTH })
  @ApiProperty({
    example: 'John Doe',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString({ message: AuthMessages.PHONE.MUST_BE_STRING })
  @MaxLength(15, { message: AuthMessages.PHONE.MAX_LENGTH })
  @MinLength(10, { message: AuthMessages.PHONE.MIN_LENGTH })
  @ApiProperty({
    example: '0123456789',
    required: false,
  })
  phone?: string;

  @IsString()
  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar?: string;
}
