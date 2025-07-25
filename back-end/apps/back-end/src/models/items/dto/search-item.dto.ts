import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from 'apps/back-end/src/common/dto/pagination.dto';
import { IsOptional } from 'class-validator';
import { ItemType } from 'generated/prisma';

export class SearchItemsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Tìm kiếm theo tên vật phẩm',
  })
  search?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: ItemType,
  })
  type?: ItemType;
}
