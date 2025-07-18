import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ItemInstanceResponseDto } from 'src/common/dto/item-instance-response.dto';
import { PrismaService } from 'src/providers/prisma.service';
import { ItemResponseDto } from 'src/common/dto/item-response.dto';
import { FarmResponseDto } from 'src/common/dto/farm-response.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateHarvestedActionDto } from './dto/update-harvested-action.dto';
import { SearchItemInstancesQueryDto } from './dto/search-item-instance.dto';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from 'src/common/dto/pagination.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class ItemInstancesService {
  constructor(private readonly prisma: PrismaService) {}

  toItemInstanceResponse(itemInstance: any): ItemInstanceResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const itemResponse = plainToInstance(ItemResponseDto, itemInstance.item, {
      excludeExtraneousValues: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const farmResponse = plainToInstance(FarmResponseDto, itemInstance.farm, {
      excludeExtraneousValues: true,
    });

    const itemInstanceResponse = plainToInstance(
      ItemInstanceResponseDto,
      itemInstance,
      {
        excludeExtraneousValues: true,
      },
    );

    itemInstanceResponse.item = itemResponse;
    itemInstanceResponse.farm = farmResponse;

    return itemInstanceResponse;
  }

  async findAll(
    { id }: { id: string },
    {
      page,
      pageSize,
      type,
      status,
      harvestedAction,
    }: SearchItemInstancesQueryDto,
  ): Promise<PaginationResponseDto<ItemInstanceResponseDto>> {
    const skip = (page - 1) * pageSize;
    const where: Prisma.ItemInstanceWhereInput = {
      userId: id,
    };

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (harvestedAction) {
      where.harvestedAction = harvestedAction;
    }

    const [items, totalItems] = await Promise.all([
      this.prisma.itemInstance.findMany({
        where,
        skip,
        take: pageSize,
      }),
      this.prisma.itemInstance.count({ where }),
    ]);

    const meta = new PaginationMetaDto(page, pageSize, totalItems);

    const itemEntities = items.map((item) => {
      return this.toItemInstanceResponse(item);
    });

    return new PaginationResponseDto(itemEntities, meta);
  }

  async findOne({ id }: { id: string }, itemInstanceId: string) {
    const itemInstance = await this.prisma.itemInstance.findUnique({
      where: {
        id: itemInstanceId,
        userId: id,
      },
      include: {
        item: true,
        farm: true,
      },
    });

    if (!itemInstance) {
      throw new NotFoundException('Không tìm thấy vật phẩm');
    }

    return this.toItemInstanceResponse(itemInstance);
  }

  async updateStatus(
    user: { id: string },
    itemInstanceId: string,
    { status }: UpdateStatusDto,
  ) {
    const itemInstance = await this.prisma.itemInstance.update({
      where: {
        id: itemInstanceId,
        userId: user.id,
      },
      data: {
        status,
      },
      include: {
        item: true,
        farm: true,
      },
    });

    if (!itemInstance) {
      throw new NotFoundException('Không tìm thấy vật phẩm');
    }

    return this.toItemInstanceResponse(itemInstance);
  }

  async updateHarvestedAction(
    user: { id: string },
    itemInstanceId: string,
    { harvestedAction }: UpdateHarvestedActionDto,
  ) {
    const itemInstance = await this.prisma.itemInstance.update({
      where: {
        id: itemInstanceId,
        userId: user.id,
      },
      data: {
        harvestedAction,
      },
      include: {
        item: true,
        farm: true,
      },
    });

    if (!itemInstance) {
      throw new NotFoundException('Không tìm thấy vật phẩm');
    }

    return this.toItemInstanceResponse(itemInstance);
  }
}
