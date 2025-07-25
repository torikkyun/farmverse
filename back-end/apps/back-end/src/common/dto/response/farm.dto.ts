import { Expose } from 'class-transformer';
import { UserResponseDto } from './user.dto';

export class FarmBaseResponseDto {
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
  user: UserResponseDto;
}

export class FarmResponseDto extends FarmBaseResponseDto {
  @Expose()
  schedule: any[];
}
