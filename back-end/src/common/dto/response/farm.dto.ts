import { Expose } from 'class-transformer';
import { UserResponseDto } from './user.dto';

export class FarmResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  address: any;

  @Expose()
  size: number;

  @Expose()
  description?: string;

  @Expose()
  images: string[];

  @Expose()
  schedule: any[];

  @Expose()
  user: UserResponseDto;
}
