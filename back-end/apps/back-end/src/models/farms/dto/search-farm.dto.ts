import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from '@app/common/dtos/pagination.dto';
import { IsOptional } from 'class-validator';

export class SearchFarmsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Tìm kiếm theo tên nông trại',
  })
  search?: string;
}
