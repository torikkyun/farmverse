import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/providers/prisma.service';
import { plainToInstance } from 'class-transformer';
import { ItemResponseDto } from 'src/common/dto/item-response.dto';
import { Prisma, UserRole } from 'generated/prisma';
import { SearchItemsQueryDto } from './dto/search-item.dto';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from 'src/common/dto/pagination.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { FarmResponseDto } from 'src/common/dto/farm-response.dto';

@Injectable()
export class ItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    { id, role }: { id: string; role: UserRole },
    createItemDto: CreateItemDto,
  ): Promise<ItemResponseDto> {
    if (role !== UserRole.FARMER) {
      throw new BadRequestException(
        'Chỉ người nông dân mới có thể tạo vật phẩm',
      );
    }

    const farm = await this.prisma.farm.findUnique({
      where: { ownerId: id },
      include: { owner: true },
    });

    if (!farm) {
      throw new BadRequestException('Không tìm thấy trang trại');
    }

    const item = await this.prisma.item.create({
      data: {
        ...createItemDto,
        farmId: farm.id,
      },
      include: {
        farm: { include: { owner: true } },
      },
    });

    const ownerResponse = plainToInstance(UserResponseDto, item.farm.owner, {
      excludeExtraneousValues: true,
    });

    const farmResponse = plainToInstance(FarmResponseDto, item.farm, {
      excludeExtraneousValues: true,
    });

    const itemResponse = plainToInstance(ItemResponseDto, item, {
      excludeExtraneousValues: true,
    });

    farmResponse.owner = ownerResponse;
    itemResponse.farm = farmResponse;

    return itemResponse;
  }

  async findAll({
    page,
    pageSize,
    search,
    type,
  }: SearchItemsQueryDto): Promise<PaginationResponseDto<ItemResponseDto>> {
    const skip = (page - 1) * pageSize;
    const where: Prisma.ItemWhereInput = {};

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }

    if (type) {
      where.type = type;
    }

    const [items, totalItems] = await Promise.all([
      this.prisma.item.findMany({
        where,
        include: { farm: { include: { owner: true } } },
        skip,
        take: pageSize,
      }),
      this.prisma.item.count({ where }),
    ]);

    const meta = new PaginationMetaDto(page, pageSize, totalItems);

    const itemEntities = items.map((item) => {
      const ownerResponse = plainToInstance(UserResponseDto, item.farm.owner, {
        excludeExtraneousValues: true,
      });

      const farmResponse = plainToInstance(FarmResponseDto, item.farm, {
        excludeExtraneousValues: true,
      });

      const itemResponse = plainToInstance(ItemResponseDto, item, {
        excludeExtraneousValues: true,
      });

      farmResponse.owner = ownerResponse;
      itemResponse.farm = farmResponse;

      return itemResponse;
    });

    return new PaginationResponseDto(itemEntities, meta);
  }

  async findOne(id: string): Promise<ItemResponseDto> {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { farm: { include: { owner: true } } },
    });

    if (!item) {
      throw new BadRequestException(`Không tìm thấy vật phẩm với ID: ${id}`);
    }

    const ownerResponse = plainToInstance(UserResponseDto, item.farm.owner, {
      excludeExtraneousValues: true,
    });

    const farmResponse = plainToInstance(FarmResponseDto, item.farm, {
      excludeExtraneousValues: true,
    });

    const itemResponse = plainToInstance(ItemResponseDto, item, {
      excludeExtraneousValues: true,
    });

    farmResponse.owner = ownerResponse;
    itemResponse.farm = farmResponse;

    return itemResponse;
  }

  async update(
    { id, role }: { id: string; role: UserRole },
    itemId: string,
    updateItemDto: UpdateItemDto,
  ) {
    if (role !== UserRole.FARMER) {
      throw new BadRequestException(
        'Chỉ người nông dân mới có thể cập nhật vật phẩm',
      );
    }

    const item = await this.prisma.item.findUnique({
      where: { id: itemId },
      include: { farm: { include: { owner: true } } },
    });

    if (!item) {
      throw new BadRequestException(
        `Không tìm thấy vật phẩm với ID: ${itemId}`,
      );
    }

    const farm = await this.prisma.farm.findUnique({
      where: { ownerId: id },
      include: { owner: true },
    });

    if (!farm) {
      throw new BadRequestException('Không tìm thấy trang trại');
    }

    if (item.farmId !== farm.id) {
      throw new BadRequestException(
        'Bạn không có quyền cập nhật vật phẩm này vì nó không thuộc trang trại của bạn',
      );
    }

    const updatedItem = await this.prisma.item.update({
      where: { id: itemId },
      data: updateItemDto,
      include: { farm: { include: { owner: true } } },
    });

    const ownerResponse = plainToInstance(UserResponseDto, item.farm.owner, {
      excludeExtraneousValues: true,
    });

    const farmResponse = plainToInstance(FarmResponseDto, item.farm, {
      excludeExtraneousValues: true,
    });

    const itemResponse = plainToInstance(ItemResponseDto, updatedItem, {
      excludeExtraneousValues: true,
    });

    farmResponse.owner = ownerResponse;
    itemResponse.farm = farmResponse;

    return itemResponse;
  }

  remove(id: string) {
    return `This action removes a #${id} item`;
  }
}
