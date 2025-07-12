import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmResponseDto } from 'src/common/dto/farm-response.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/providers/prisma.service';
import { SearchFarmsQueryDto } from './dto/search-farm.dto';
import {
  PaginationResponseDto,
  PaginationMetaDto,
} from 'src/common/dto/pagination.dto';
import { Prisma, UserRole } from 'generated/prisma';
import { UserResponseDto } from 'src/common/dto/user-response.dto';

@Injectable()
export class FarmsService {
  constructor(private readonly prisma: PrismaService) {}

  private toFarmResponse(farm: any): FarmResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const ownerResponse = plainToInstance(UserResponseDto, farm.owner, {
      excludeExtraneousValues: true,
    });

    const farmResponse = plainToInstance(FarmResponseDto, farm, {
      excludeExtraneousValues: true,
    });

    farmResponse.owner = ownerResponse;
    return farmResponse;
  }

  async create(
    { id, role }: { id: string; role: UserRole },
    createFarmDto: CreateFarmDto,
  ): Promise<{ message: string; farm: FarmResponseDto }> {
    if (role !== UserRole.FARMER) {
      throw new ForbiddenException('Bạn không có quyền tạo trang trại');
    }

    const existingFarm = await this.prisma.farm.findFirst({
      where: { ownerId: id },
    });

    if (existingFarm) {
      throw new ConflictException('Bạn đã có trang trại');
    }

    const farm = await this.prisma.farm.create({
      data: {
        ...createFarmDto,
        ownerId: id,
      },
    });

    return {
      message: 'Tạo trang trại thành công',
      farm: this.toFarmResponse(farm),
    };
  }

  async findAll({
    page,
    pageSize,
    search,
  }: SearchFarmsQueryDto): Promise<PaginationResponseDto<FarmResponseDto>> {
    const skip = (page - 1) * pageSize;
    const where: Prisma.FarmWhereInput = {};

    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }

    const [farms, totalItems] = await Promise.all([
      this.prisma.farm.findMany({
        where,
        include: { owner: true },
        skip,
        take: pageSize,
      }),
      this.prisma.farm.count({ where }),
    ]);

    const meta = new PaginationMetaDto(page, pageSize, totalItems);

    const items = farms.map((farm) => {
      return this.toFarmResponse(farm);
    });

    return new PaginationResponseDto(items, meta);
  }

  async findOne(id: string): Promise<FarmResponseDto> {
    const farm = await this.prisma.farm.findUnique({
      where: { id },
      include: { owner: true },
    });

    if (!farm) {
      throw new NotFoundException(`Không tìm thấy trang trại với ID: ${id}`);
    }

    return this.toFarmResponse(farm);
  }

  async findByOwnerId(
    ownerId: string,
  ): Promise<{ message: string; farm: FarmResponseDto }> {
    const farm = await this.prisma.farm.findFirst({
      where: { ownerId },
      include: {
        owner: true,
      },
    });

    if (!farm) {
      throw new NotFoundException(
        `Không tìm thấy trang trại với userId: ${ownerId}`,
      );
    }

    return {
      message: 'Tìm thấy trang trại thành công',
      farm: this.toFarmResponse(farm),
    };
  }

  async update(
    { id }: { id: string },
    updateFarmDto: UpdateFarmDto,
  ): Promise<{ message: string; farm: FarmResponseDto }> {
    const farm = await this.prisma.farm.findUnique({ where: { ownerId: id } });

    if (!farm) {
      throw new NotFoundException(`Không tìm thấy trang trại với ID: ${id}`);
    }

    const updatedFarm = await this.prisma.farm.update({
      where: { ownerId: id },
      data: updateFarmDto,
    });

    return {
      message: 'Cập nhật trang trại thành công',
      farm: this.toFarmResponse(updatedFarm),
    };
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
