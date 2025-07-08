import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiProperty({ example: 1, required: false })
  page: number;

  @ApiProperty({ example: 10, required: false })
  pageSize: number;

  constructor(page: number, pageSize: number) {
    this.page = page || 1;
    this.pageSize = pageSize || 10;
  }
}

export class PaginationMetaDto {
  @ApiProperty({ example: 1 })
  currentPage: number;

  @ApiProperty({ example: 10 })
  pageSize: number;

  @ApiProperty({ example: 100 })
  totalItems: number;

  @ApiProperty({ example: 10 })
  totalPages: number;

  constructor(currentPage: number, pageSize: number, totalItems: number) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / pageSize);
  }
}

export class PaginationResponseDto<T> {
  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;

  @ApiProperty({ isArray: true })
  items: T[];

  constructor(items: T[], meta: PaginationMetaDto) {
    this.items = items;
    this.meta = meta;
  }
}
