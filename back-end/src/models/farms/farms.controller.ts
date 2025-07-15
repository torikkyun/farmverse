import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FarmResponseDto } from 'src/common/dto/farm-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';
import { SearchFarmsQueryDto } from './dto/search-farm.dto';
import { UserRole } from 'generated/prisma';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('api/farms')
@ApiTags('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @Roles(UserRole.FARMER)
  @ApiBearerAuth()
  create(
    @CurrentUser() user: { id: string },
    @Body() createFarmDto: CreateFarmDto,
  ): Promise<{ message: string; farm: FarmResponseDto }> {
    return this.farmsService.create(user, createFarmDto);
  }

  @Get()
  @Public()
  findAll(
    @Query() searchFarmsQueryDto: SearchFarmsQueryDto,
  ): Promise<PaginationResponseDto<FarmResponseDto>> {
    return this.farmsService.findAll(searchFarmsQueryDto);
  }

  @Get(':farmId')
  @Public()
  findOne(@Param('farmId') farmId: string): Promise<FarmResponseDto> {
    return this.farmsService.findOne(farmId);
  }

  @Get('owner/:ownerId')
  @Public()
  findByOwnerId(
    @Param('ownerId') ownerId: string,
  ): Promise<{ message: string; farm: FarmResponseDto }> {
    return this.farmsService.findByOwnerId(ownerId);
  }

  @Patch()
  @ApiBearerAuth()
  update(
    @CurrentUser() user: { id: string },
    @Body() updateFarmDto: UpdateFarmDto,
  ): Promise<{ message: string; farm: FarmResponseDto }> {
    return this.farmsService.update(user, updateFarmDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.farmsService.remove(+id);
  // }
}
