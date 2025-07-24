import { Expose } from 'class-transformer';
import { UserRole } from 'generated/prisma';

export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  name: string;

  @Expose()
  avatar: string;

  @Expose()
  address: string;

  @Expose()
  fvtBalance: number;

  @Expose()
  role: UserRole;
}
