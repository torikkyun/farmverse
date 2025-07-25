import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SearchFarmsQueryDto } from './dto/search-farm.dto';
import { UserRole } from 'generated/prisma';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { FileValidationPipe } from '../../common/pipes/file-validation.pipe';
import {
  FarmBaseResponseDto,
  FarmResponseDto,
} from '../../common/dto/response/farm.dto';
import { Public } from '../../common/decorators/public.decorator';

@Controller('api/farms')
@ApiTags('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @Roles(UserRole.FARMER)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  create(
    @CurrentUser() user: { id: string },
    @Body() createFarmDto: CreateFarmDto,
    @UploadedFiles(new FileValidationPipe())
    images?: Array<Express.Multer.File>,
  ): Promise<{ message: string; farm: FarmResponseDto }> {
    return this.farmsService.create(user, createFarmDto, images);
  }

  @Get()
  @Public()
  findAll(@Query() searchFarmsQueryDto: SearchFarmsQueryDto): Promise<{
    message: string;
    items: FarmBaseResponseDto[];
  }> {
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
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  update(
    @CurrentUser() user: { id: string },
    @Body() updateFarmDto: UpdateFarmDto,
    @UploadedFiles(new FileValidationPipe())
    images?: Array<Express.Multer.File>,
  ): Promise<{ message: string; farm: FarmResponseDto }> {
    return this.farmsService.update(user, updateFarmDto, images);
  }
}
