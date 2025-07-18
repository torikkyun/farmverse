import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ItemInstancesService } from './item-instances.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'generated/prisma';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateHarvestedActionDto } from './dto/update-harvested-action.dto';
import { SearchItemInstancesQueryDto } from './dto/search-item-instance.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { ItemInstanceResponseDto } from 'src/common/dto/item-instance-response.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';
import { UpdateHarvestProcessStatusDto } from './dto/update-harvest-process-status.dto';

@Controller('api/item-instances')
@ApiTags('item-instances')
export class ItemInstancesController {
  constructor(private readonly itemInstancesService: ItemInstancesService) {}

  @Get()
  @ApiBearerAuth()
  findAll(
    @CurrentUser() user: { id: string },
    @Query() searchItemInstancesQueryDto: SearchItemInstancesQueryDto,
  ): Promise<PaginationResponseDto<ItemInstanceResponseDto>> {
    return this.itemInstancesService.findAll(user, searchItemInstancesQueryDto);
  }

  @Get(':itemInstanceId')
  @ApiBearerAuth()
  findOne(
    @CurrentUser() user: { id: string },
    @Param('itemInstanceId') itemInstanceId: string,
  ): Promise<ItemInstanceResponseDto> {
    return this.itemInstancesService.findOne(user, itemInstanceId);
  }

  @Patch(':itemInstanceId/status')
  @Roles(UserRole.FARMER)
  @ApiBearerAuth()
  updateStatus(
    @CurrentUser() user: { id: string },
    @Param('itemInstanceId') itemInstanceId: string,
    @Query() updateStatusDto: UpdateStatusDto,
  ): Promise<ItemInstanceResponseDto> {
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
    @Query() updateHarvestedActionDto: UpdateHarvestedActionDto,
  ): Promise<ItemInstanceResponseDto> {
    return this.itemInstancesService.updateHarvestedAction(
      user,
      itemInstanceId,
      updateHarvestedActionDto,
    );
  }

  @Patch(':itemInstanceId/camera')
  @Roles(UserRole.FARMER)
  @ApiBearerAuth()
  updateCamera(
    @CurrentUser() user: { id: string },
    @Param('itemInstanceId') itemInstanceId: string,
    @Body() updateCameraDto: UpdateCameraDto,
  ): Promise<ItemInstanceResponseDto> {
    return this.itemInstancesService.updateCamera(
      user,
      itemInstanceId,
      updateCameraDto,
    );
  }

  @Patch(':itemInstanceId/harvest-process-status')
  @Roles(UserRole.FARMER)
  @ApiBearerAuth()
  updateHarvestProcessStatus(
    @CurrentUser() user: { id: string },
    @Param('itemInstanceId') itemInstanceId: string,
    @Query() updateHarvestProcessStatusDto: UpdateHarvestProcessStatusDto,
  ): Promise<ItemInstanceResponseDto> {
    return this.itemInstancesService.updateHarvestProcessStatus(
      user,
      itemInstanceId,
      updateHarvestProcessStatusDto,
    );
  }
}
