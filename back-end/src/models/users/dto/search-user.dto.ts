import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

export class SearchUsersQueryDto extends PaginationQueryDto {
  @ApiProperty({
    required: false,
    description: 'Tìm kiếm theo tên hoặc email',
  })
  search?: string;

  @ApiProperty({
    required: false,
    enum: UserRole,
  })
  role?: UserRole;
}
