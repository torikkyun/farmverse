import { Expose } from 'class-transformer';
import { UserRole } from 'generated/prisma';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  phone?: string;

  @Expose()
  @ApiProperty()
  role: UserRole;

  @Expose()
  @ApiProperty()
  avatar?: string;

  @Expose()
  @ApiProperty()
  fvtBalance: number;
}
