import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { plainToInstance } from 'class-transformer';
import { Prisma } from 'generated/prisma';
import { SearchItemsQueryDto } from './dto/search-item.dto';
import { PrismaService } from '@shared/providers/prisma.service';
import {
  ItemBaseResponseDto,
  ItemResponseDto,
} from '@app/common/dtos/response/item.dto';
import { UserResponseDto } from '@app/common/dtos/response/user.dto';
import { FarmResponseDto } from '@app/common/dtos/response/farm.dto';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from '@app/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ItemsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.staticUrl = this.configService.get('STATIC_URL')!;
  }

  private staticUrl: string;

  private toItemBaseResponse(item: any): ItemBaseResponseDto {
    return plainToInstance(ItemBaseResponseDto, item, {
      excludeExtraneousValues: true,
    });
  }

  private toItemResponse(item: any): ItemResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const ownerResponse = plainToInstance(UserResponseDto, item.farm.user, {
      excludeExtraneousValues: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const farmResponse = plainToInstance(FarmResponseDto, item.farm, {
      excludeExtraneousValues: true,
    });

    const itemResponse = plainToInstance(ItemResponseDto, item, {
      excludeExtraneousValues: true,
    });

    farmResponse.user = ownerResponse;
    itemResponse.farm = farmResponse;

    return itemResponse;
  }

  async create(
    { id }: { id: string },
    createItemDto: CreateItemDto,
    images?: Array<Express.Multer.File>,
  ): Promise<{ message: string; item: ItemResponseDto }> {
    const farm = await this.prisma.farm.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!farm) {
      throw new BadRequestException('Không tìm thấy trang trại');
    }

    if (images && images.length > 0) {
      createItemDto.images = images.map(
        (file) => `${this.staticUrl}/items/${file.filename}`,
      );
    }

    const item = await this.prisma.item.create({
      data: {
        ...createItemDto,
        farmId: farm.id,
      },
      include: {
        farm: { include: { user: true } },
      },
    });

    return {
      message: 'Tạo vật phẩm thành công',
      item: this.toItemResponse(item),
    };
  }

  async findAll({
    page,
    pageSize,
    search,
    type,
  }: SearchItemsQueryDto): Promise<{
    message: string;
    items: ItemBaseResponseDto[];
  }> {
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
        include: { farm: true },
        skip,
        take: pageSize,
      }),
      this.prisma.item.count({ where }),
    ]);

    const meta = new PaginationMetaDto(page, pageSize, totalItems);

    const itemEntities = items.map((item) => {
      return this.toItemBaseResponse(item);
    });

    return {
      message: 'Lấy danh sách vật phẩm thành công',
      ...new PaginationResponseDto(itemEntities, meta),
    };
  }

  async findOne(
    id: string,
  ): Promise<{ message: string; item: ItemResponseDto }> {
    const item = await this.prisma.item.findUnique({
      where: { id },
      include: { farm: { include: { user: true } } },
    });

    if (!item) {
      throw new NotFoundException(`Không tìm thấy vật phẩm với ID: ${id}`);
    }

    return {
      message: 'Lấy vật phẩm thành công',
      item: this.toItemResponse(item),
    };
  }

  async findAllByFarmId(
    farmId: string,
    { page, pageSize, search, type }: SearchItemsQueryDto,
  ): Promise<{ message: string; items: ItemBaseResponseDto[] }> {
    const skip = (page - 1) * pageSize;
    const where: Prisma.ItemWhereInput = {};

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }

    if (type) {
      where.type = type;
    }

    const items = await this.prisma.item.findMany({
      where: { farmId, ...where },
      include: { farm: { include: { user: true } } },
      skip,
      take: pageSize,
    });

    return {
      message: 'Lấy danh sách vật phẩm theo trang trại thành công',
      items: items.map((item) => this.toItemBaseResponse(item)),
    };
  }

  async update(
    { id }: { id: string },
    itemId: string,
    updateItemDto: UpdateItemDto,
    images?: Express.Multer.File[],
  ): Promise<{ message: string; item: ItemResponseDto }> {
    const item = await this.prisma.item.findUnique({
      where: { id: itemId },
      include: { farm: { include: { user: true } } },
    });

    if (!item) {
      throw new NotFoundException(`Không tìm thấy vật phẩm với ID: ${itemId}`);
    }

    const farm = await this.prisma.farm.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!farm) {
      throw new NotFoundException('Không tìm thấy trang trại');
    }

    if (item.farmId !== farm.id) {
      throw new ForbiddenException(
        'Bạn không có quyền cập nhật vật phẩm này vì nó không thuộc trang trại của bạn',
      );
    }

    if (images && images.length > 0) {
      updateItemDto.images = images.map(
        (file) => `${this.staticUrl}/items/${file.filename}`,
      );
    }

    const updatedItem = await this.prisma.item.update({
      where: { id: itemId },
      data: updateItemDto,
      include: { farm: { include: { user: true } } },
    });

    return {
      message: 'Cập nhật vật phẩm thành công',
      item: this.toItemResponse(updatedItem),
    };
  }

  remove(id: string) {
    return `This action removes a #${id} item`;
  }
}
