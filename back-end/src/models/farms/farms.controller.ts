import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { FarmResponseDto } from 'src/common/dto/farm-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@Controller('api/farms')
@ApiTags('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto);
  }

  @Get()
  // @Public()
  findAll() {
    return {
      message: 'This endpoint is not implemented yet.',
      data: [],
    };
  }

  @Get(':farmId')
  @Public()
  findOne(@Param('farmId') farmId: string): Promise<FarmResponseDto> {
    return this.farmsService.findOne(farmId);
  }

  @Patch()
  update(
    @CurrentUser() user: { id: string },
    @Body() updateFarmDto: UpdateFarmDto,
  ) {
    return this.farmsService.update(user, updateFarmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmsService.remove(+id);
  }
}
