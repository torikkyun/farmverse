import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Expose } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';

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
  @ApiProperty({ type: UserResponseDto })
  owner: UserResponseDto;
}
