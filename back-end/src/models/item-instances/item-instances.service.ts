import { Injectable } from '@nestjs/common';
import { CreateItemInstanceDto } from './dto/create-item-instance.dto';
import { UpdateItemInstanceDto } from './dto/update-item-instance.dto';

@Injectable()
export class ItemInstancesService {
  create(createItemInstanceDto: CreateItemInstanceDto) {
    return 'This action adds a new itemInstance';
  }

  findAll() {
    return `This action returns all itemInstances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemInstance`;
  }

  update(id: number, updateItemInstanceDto: UpdateItemInstanceDto) {
    return `This action updates a #${id} itemInstance`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemInstance`;
  }
}
