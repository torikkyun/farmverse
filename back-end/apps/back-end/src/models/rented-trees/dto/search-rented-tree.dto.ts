import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '@app/common/dtos/pagination.dto';
import { IsOptional } from 'class-validator';
import { statusTree } from 'generated/prisma';

export class SearchRentedTreesQueryDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Tìm kiếm theo tên cây thuê',
  })
  search?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: statusTree,
  })
  status?: statusTree;
}
