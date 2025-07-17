import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemInstancesService } from './item-instances.service';
import { CreateItemInstanceDto } from './dto/create-item-instance.dto';
import { UpdateItemInstanceDto } from './dto/update-item-instance.dto';

@Controller('item-instances')
export class ItemInstancesController {
  constructor(private readonly itemInstancesService: ItemInstancesService) {}

  @Post()
  create(@Body() createItemInstanceDto: CreateItemInstanceDto) {
    return this.itemInstancesService.create(createItemInstanceDto);
  }

  @Get()
  findAll() {
    return this.itemInstancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemInstancesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemInstanceDto: UpdateItemInstanceDto,
  ) {
    return this.itemInstancesService.update(+id, updateItemInstanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemInstancesService.remove(+id);
  }
}
