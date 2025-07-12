import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class FarmResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  description?: string;

  @Expose()
  @ApiProperty()
  location: string;

  @Expose()
  @ApiProperty()
  size: number;

  @Expose()
  @ApiProperty()
  images: string[];

  @Expose()
  @Type(() => UserResponseDto)
  @ApiProperty({ type: UserResponseDto })
  owner: UserResponseDto;
}
