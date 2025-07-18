import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ItemInstancesService } from './item-instances.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma';
import { UpdateStatusDto } from './dto/update-status.dto';

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

  // @Patch(':itemInstanceId/harvested-action')
  // @Roles(UserRole.TENANT)
  // @ApiBearerAuth()
  // updateHarvestedAction(
  //   @CurrentUser() user: { id: string },
  //   @Param('itemInstanceId') itemInstanceId: string,
  // ) {
  //   return this.itemInstancesService.updateHarvestedAction(
  //     user,
  //     itemInstanceId,
  //   );
  // }
}
