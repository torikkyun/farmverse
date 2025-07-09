import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UserMessages } from 'src/common/constants/validation-messages';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: UserMessages.NAME.MUST_BE_STRING })
  @MaxLength(50, { message: UserMessages.NAME.MAX_LENGTH })
  @MinLength(2, { message: UserMessages.NAME.MIN_LENGTH })
  @ApiProperty({
    example: 'John Doe',
    required: false,
  })
  name?: string;

  @IsOptional()
  @IsString({ message: UserMessages.PHONE.MUST_BE_STRING })
  @MaxLength(15, { message: UserMessages.PHONE.MAX_LENGTH })
  @MinLength(10, { message: UserMessages.PHONE.MIN_LENGTH })
  @ApiProperty({
    example: '0123456789',
    required: false,
  })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar?: string;
}
