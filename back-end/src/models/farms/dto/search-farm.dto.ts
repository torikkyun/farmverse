import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

export class SearchUsersQueryDto extends PaginationQueryDto {
  @ApiProperty({
    required: false,
    description: 'Tìm kiếm theo tên nông trại',
  })
  search?: string;

  @ApiProperty({
    required: false,
    description: 'Lọc theo vai trò người dùng: FARMER, TENANT, ADMIN',
  })
  role?: UserRole;
}
