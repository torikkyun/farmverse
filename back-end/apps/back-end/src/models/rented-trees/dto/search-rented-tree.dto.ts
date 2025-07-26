import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '@app/common/dto/pagination.dto';
import { IsOptional } from 'class-validator';
import { statusRentedTree } from 'generated/prisma';

export class SearchRentedTreesQueryDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Tìm kiếm theo tên vật phẩm',
  })
  search?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: statusRentedTree,
  })
  status?: statusRentedTree;
}
