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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SearchItemsQueryDto } from './dto/search-item.dto';
import { UserRole } from 'generated/prisma';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Roles } from '@app/common/decorators/roles.decorator';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { FileValidationPipe } from '@app/common/pipes/file-validation.pipe';
import {
  ItemBaseResponseDto,
  ItemResponseDto,
} from '@app/common/dtos/response/item.dto';
import { Public } from '@app/common/decorators/public.decorator';

@Controller('api/items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @Roles(UserRole.FARMER)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  create(
    @CurrentUser() user: { id: string },
    @Body() createItemDto: CreateItemDto,
    @UploadedFiles(new FileValidationPipe())
    images?: Array<Express.Multer.File>,
  ): Promise<{ message: string; item: ItemResponseDto }> {
    return this.itemsService.create(user, createItemDto, images);
  }

  @Get()
  @Public()
  findAll(@Query() searchItemsQueryDto: SearchItemsQueryDto): Promise<{
    message: string;
    items: ItemBaseResponseDto[];
  }> {
    return this.itemsService.findAll(searchItemsQueryDto);
  }

  @Get(':itemId')
  @Public()
  findOne(@Param('itemId') itemId: string) {
    return this.itemsService.findOne(itemId);
  }

  @Get('farm/:farmId')
  @Public()
  findAllByFarmId(
    @Param('farmId') farmId: string,
    @Query() searchItemsQueryDto: SearchItemsQueryDto,
  ): Promise<{
    message: string;
    items: ItemBaseResponseDto[];
  }> {
    return this.itemsService.findAllByFarmId(farmId, searchItemsQueryDto);
  }

  @Patch(':itemId')
  @Roles(UserRole.FARMER)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 5 }]))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  update(
    @CurrentUser() user: { id: string },
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFiles(new FileValidationPipe())
    images?: Array<Express.Multer.File>,
  ) {
    return this.itemsService.update(user, itemId, updateItemDto, images);
  }

  // @Delete(':itemId')
  // @ApiBearerAuth()
  // remove(@Param('itemId') itemId: string) {
  //   return this.itemsService.remove(itemId);
  // }
}
