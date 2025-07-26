import { Controller, Get, Param, Query } from '@nestjs/common';
import { RentedTreesService } from './rented-trees.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { SearchRentedTreesQueryDto } from './dto/search-rented-tree.dto';

@Controller('api/rented-trees')
@ApiTags('rented-trees')
export class RentedTreesController {
  constructor(private readonly rentedTreesService: RentedTreesService) {}

  @Get()
  @ApiBearerAuth()
  findAll(@Query() searchRentedTreesQueryDto: SearchRentedTreesQueryDto) {
    return this.rentedTreesService.findAll(searchRentedTreesQueryDto);
  }

  @Get(':rentedTreeId')
  @ApiBearerAuth()
  findOne(
    @CurrentUser() user: { id: string },
    @Param('rentedTreeId') rentedTreeId: string,
  ) {
    return this.rentedTreesService.findOne(user, rentedTreeId);
  }
}
