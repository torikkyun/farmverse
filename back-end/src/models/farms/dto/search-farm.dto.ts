import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

export class SearchFarmsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Tìm kiếm theo tên nông trại',
  })
  search?: string;
}
