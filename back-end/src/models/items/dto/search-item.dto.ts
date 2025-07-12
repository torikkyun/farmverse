import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ItemType } from 'generated/prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

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
