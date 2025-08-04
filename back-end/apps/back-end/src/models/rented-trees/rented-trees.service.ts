import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@shared/providers/prisma.service';
import { SearchRentedTreesQueryDto } from './dto/search-rented-tree.dto';
import {
  RentedTreeBaseResponseDto,
  RentedTreeResponseDto,
} from '@app/common/dtos/response/rentedTree.dto';
import { Prisma } from '@prisma/client';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from '@app/common/dtos/pagination.dto';
import { plainToInstance } from 'class-transformer';
import { FarmResponseDto } from '@app/common/dtos/response/farm.dto';

@Injectable()
export class RentedTreesService {
  constructor(private readonly prisma: PrismaService) {}

  private toRentedTreeBaseResponse(rentedTree: any): RentedTreeBaseResponseDto {
    return plainToInstance(RentedTreeBaseResponseDto, rentedTree, {
      excludeExtraneousValues: true,
    });
  }

  private toRentedTreeResponse(rentedTree: any): RentedTreeResponseDto {
    const rentedTreeResponse = plainToInstance(
      RentedTreeResponseDto,
      rentedTree,
      {
        excludeExtraneousValues: true,
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const farmResponse = plainToInstance(FarmResponseDto, rentedTree.farm, {
      excludeExtraneousValues: true,
    });

    rentedTreeResponse.farm = farmResponse;

    return rentedTreeResponse;
  }

  async findAll(
    { id }: { id: string },
    { page, pageSize, search, status }: SearchRentedTreesQueryDto,
  ): Promise<{
    message: string;
    items: RentedTreeBaseResponseDto[];
  }> {
    const skip = (page - 1) * pageSize;
    const where: Prisma.RentedTreeWhereInput = {
      userId: id,
    };

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }

    if (status) {
      where.status = status;
    }

    const [rentedTrees, totalItems] = await Promise.all([
      this.prisma.rentedTree.findMany({
        where,
        include: { farm: true },
        skip,
        take: pageSize,
      }),
      this.prisma.rentedTree.count({ where }),
    ]);

    const meta = new PaginationMetaDto(page, pageSize, totalItems);

    const items = rentedTrees.map((rentedTree) => {
      return this.toRentedTreeBaseResponse(rentedTree);
    });

    return {
      message: 'Lấy danh sách cây thuê thành công',
      ...new PaginationResponseDto(items, meta),
    };
  }

  async findOne(
    { id }: { id: string },
    rentedTreeId: string,
  ): Promise<{ message: string; rentedTree: RentedTreeResponseDto }> {
    const rentedTree = await this.prisma.rentedTree.findUnique({
      where: { id: rentedTreeId, userId: id },
      include: { farm: true },
    });

    if (!rentedTree) {
      throw new NotFoundException(
        `Không tìm thấy cây thuê với ID: ${rentedTreeId}`,
      );
    }

    return {
      message: 'Lấy cây thuê thành công',
      rentedTree: this.toRentedTreeResponse(rentedTree),
    };
  }
}
