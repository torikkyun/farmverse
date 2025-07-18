import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ItemInstancesService } from './item-instances.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateHarvestedActionDto } from './dto/update-harvested-action.dto';
import { SearchItemInstancesQueryDto } from './dto/search-item-instance.dto';

@Controller('api/item-instances')
@ApiTags('item-instances')
export class ItemInstancesController {
  constructor(private readonly itemInstancesService: ItemInstancesService) {}

  @Get()
  @ApiBearerAuth()
  findAll(
    @CurrentUser() user: { id: string },
    @Query() searchItemInstancesQueryDto: SearchItemInstancesQueryDto,
  ) {
    return this.itemInstancesService.findAll(user, searchItemInstancesQueryDto);
  }

  @Get(':itemInstanceId')
  @ApiBearerAuth()
  findOne(
    @CurrentUser() user: { id: string },
    @Param('itemInstanceId') itemInstanceId: string,
  ) {
    return this.itemInstancesService.findOne(user, itemInstanceId);
  }

  @Patch(':itemInstanceId')
  @Roles(UserRole.FARMER)
  @ApiBearerAuth()
  updateStatus(
    @CurrentUser() user: { id: string },
    @Param('itemInstanceId') itemInstanceId: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.itemInstancesService.updateStatus(
      user,
      itemInstanceId,
      updateStatusDto,
    );
  }

  @Patch(':itemInstanceId/harvested-action')
  @Roles(UserRole.TENANT)
  @ApiBearerAuth()
  updateHarvestedAction(
    @CurrentUser() user: { id: string },
    @Param('itemInstanceId') itemInstanceId: string,
    @Body() updateHarvestedActionDto: UpdateHarvestedActionDto,
  ) {
    return this.itemInstancesService.updateHarvestedAction(
      user,
      itemInstanceId,
      updateHarvestedActionDto,
    );
  }
}
