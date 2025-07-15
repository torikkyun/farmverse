import { PartialType } from '@nestjs/swagger';
import { CreateItemInstanceDto } from './create-item-instance.dto';

export class UpdateItemInstanceDto extends PartialType(CreateItemInstanceDto) {}
