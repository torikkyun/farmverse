import { Controller, Get, Param, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiTags } from '@nestjs/swagger';
import { SearchInventoriesQueryDto } from './dto/search-inventory.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { InventoryResponseDto } from '@app/common/dto/response/inventory.dto';

@Controller('api/inventory')
@ApiTags('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(
    @CurrentUser() user: { id: string },
    @Query() searchInventoriesQueryDto: SearchInventoriesQueryDto,
  ): Promise<{
    message: string;
    items: InventoryResponseDto[];
  }> {
    return this.inventoryService.findAll(user, searchInventoriesQueryDto);
  }

  @Get(':inventoryId')
  findOne(
    @CurrentUser() user: { id: string },
    @Param('inventoryId') inventoryId: string,
  ) {
    return this.inventoryService.findOne(user, inventoryId);
  }
}
