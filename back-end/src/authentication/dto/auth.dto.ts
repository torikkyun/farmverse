import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from 'generated/prisma';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'farmer@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(15)
  @ApiProperty({
    example: '123456',
  })
  password: string;
}

export class RegisterDto extends LoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Trần Đình Phúc Đức',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  @ApiProperty({
    example: '0123456789',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'FARMER',
    enum: UserRole,
  })
  role: UserRole;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
  })
  avatar?: string;
}
