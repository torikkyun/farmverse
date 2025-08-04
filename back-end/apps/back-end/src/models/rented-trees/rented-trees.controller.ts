import { Controller, Get, Param, Query } from '@nestjs/common';
import { RentedTreesService } from './rented-trees.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { SearchRentedTreesQueryDto } from './dto/search-rented-tree.dto';
import {
  RentedTreeBaseResponseDto,
  RentedTreeResponseDto,
} from '@app/common/dtos/response/rentedTree.dto';

@Controller('api/rented-trees')
@ApiTags('rented-trees')
export class RentedTreesController {
  constructor(private readonly rentedTreesService: RentedTreesService) {}

  @Get()
  @ApiBearerAuth()
  findAll(
    @CurrentUser() user: { id: string },
    @Query() searchRentedTreesQueryDto: SearchRentedTreesQueryDto,
  ): Promise<{
    message: string;
    items: RentedTreeBaseResponseDto[];
  }> {
    return this.rentedTreesService.findAll(user, searchRentedTreesQueryDto);
  }

  @Get(':rentedTreeId')
  @ApiBearerAuth()
  findOne(
    @CurrentUser() user: { id: string },
    @Param('rentedTreeId') rentedTreeId: string,
  ): Promise<{
    message: string;
    rentedTree: RentedTreeResponseDto;
  }> {
    return this.rentedTreesService.findOne(user, rentedTreeId);
  }
}
