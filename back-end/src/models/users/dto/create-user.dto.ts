import { UserRole } from 'generated/prisma';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}
