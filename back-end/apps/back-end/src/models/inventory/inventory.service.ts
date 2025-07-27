import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/providers/prisma.service';
import { SearchInventoriesQueryDto } from './dto/search-inventory.dto';
import { InventoryResponseDto } from '@app/common/dto/response/inventory.dto';
import { plainToInstance } from 'class-transformer';
import { Prisma } from '@prisma/client';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from '@app/common/dto/pagination.dto';

@Injectable()
export class InventoryService {
  constructor(private readonly prisma: PrismaService) {}

  toInventoryResponse(inventory: any) {
    return plainToInstance(InventoryResponseDto, inventory, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    { id }: { id: string },
    { page, pageSize, search, type }: SearchInventoriesQueryDto,
  ): Promise<{
    message: string;
    items: InventoryResponseDto[];
  }> {
    const skip = (page - 1) * pageSize;
    const where: Prisma.InventoryWhereInput = {
      userId: id,
    };

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }

    if (type) {
      where.type = type;
    }

    const [inventories, totalItems] = await Promise.all([
      this.prisma.inventory.findMany({
        where,
        skip,
        take: pageSize,
      }),
      this.prisma.inventory.count({ where }),
    ]);

    const meta = new PaginationMetaDto(page, pageSize, totalItems);

    const items = inventories.map((inventory) => {
      return this.toInventoryResponse(inventory);
    });

    return {
      message: 'Lấy danh sách vật phẩm thành công',
      ...new PaginationResponseDto(items, meta),
    };
  }

  async findOne(
    { id }: { id: string },
    inventoryId: string,
  ): Promise<{ message: string; inventory: InventoryResponseDto }> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id: inventoryId, userId: id },
    });

    if (!inventory) {
      throw new NotFoundException(
        `Không tìm thấy vật phẩm với ID: ${inventoryId}`,
      );
    }

    return {
      message: 'Lấy thông tin vật phẩm thành công',
      inventory: this.toInventoryResponse(inventory),
    };
  }
}
