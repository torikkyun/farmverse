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
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemResponseDto } from 'src/common/dto/item-response.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { Public } from 'src/common/decorators/public.decorator';
import { SearchItemsQueryDto } from './dto/search-item.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';
import { UserRole } from 'generated/prisma';

@Controller('api/items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiBearerAuth()
  create(
    @CurrentUser() user: { id: string; role: UserRole },
    @Body(new ValidationPipe()) createItemDto: CreateItemDto,
  ): Promise<{ message: string; item: ItemResponseDto }> {
    return this.itemsService.create(user, createItemDto);
  }

  @Get()
  @Public()
  findAll(
    @Query(new ValidationPipe()) searchItemsQueryDto: SearchItemsQueryDto,
  ): Promise<PaginationResponseDto<ItemResponseDto>> {
    return this.itemsService.findAll(searchItemsQueryDto);
  }

  @Get(':itemId')
  @Public()
  findOne(@Param('itemId') itemId: string) {
    return this.itemsService.findOne(itemId);
  }

  @Patch(':itemId')
  @ApiBearerAuth()
  update(
    @CurrentUser() user: { id: string; role: UserRole },
    @Param('itemId') itemId: string,
    @Body(new ValidationPipe()) updateItemDto: UpdateItemDto,
  ) {
    return this.itemsService.update(user, itemId, updateItemDto);
  }

  @Delete(':itemId')
  @ApiBearerAuth()
  remove(@Param('itemId') itemId: string) {
    return this.itemsService.remove(itemId);
  }
}
