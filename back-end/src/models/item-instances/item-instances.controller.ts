import { Controller, Get, Param } from '@nestjs/common';
import { ItemInstancesService } from './item-instances.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('api/item-instances')
@ApiTags('item-instances')
export class ItemInstancesController {
  constructor(private readonly itemInstancesService: ItemInstancesService) {}

  @Get()
  @ApiBearerAuth()
  findAll(@CurrentUser() user: { id: string }) {
    return this.itemInstancesService.findAll(user);
  }

  @Get(':itemInstanceId')
  @ApiBearerAuth()
  findOne(
    @CurrentUser() user: { id: string },
    @Param('itemInstanceId') itemInstanceId: string,
  ) {
    return this.itemInstancesService.findOne(user, itemInstanceId);
  }
}
