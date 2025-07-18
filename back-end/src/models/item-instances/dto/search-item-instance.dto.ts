import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  HarvestedAction,
  ItemType,
  TreeRootInstanceStatus,
} from 'generated/prisma';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

export class SearchItemInstancesQueryDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    enum: ItemType,
  })
  type?: ItemType;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: TreeRootInstanceStatus,
  })
  status?: TreeRootInstanceStatus;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: HarvestedAction,
  })
  harvestedAction?: HarvestedAction;
}
