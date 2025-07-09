import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Expose } from 'class-transformer/types/decorators/expose.decorator';

export class FarmResponseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description?: string;

  @ApiProperty()
  @Expose()
  location: string;

  @ApiProperty()
  @Expose()
  size: number;

  @ApiProperty()
  @Expose()
  images: string[];
}
