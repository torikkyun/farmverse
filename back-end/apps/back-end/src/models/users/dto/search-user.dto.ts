import { PaginationQueryDto } from '@app/common/dto/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserRole } from 'generated/prisma';

export class SearchUsersQueryDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Tìm kiếm theo tên hoặc email',
  })
  search?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: UserRole,
  })
  role?: UserRole;
}
