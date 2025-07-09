import {
  BadRequestException,
  ConflictException,
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

  async create(
    { id, role }: { id: string; role: UserRole },
    createFarmDto: CreateFarmDto,
  ): Promise<FarmResponseDto> {
    if (role !== UserRole.FARMER) {
      throw new BadRequestException('Bạn không có quyền tạo trang trại');
    }

    const existingFarm = await this.prisma.farm.findFirst({
      where: { ownerId: id },
    });

    if (existingFarm) {
      throw new BadRequestException('Bạn đã có trang trại');
    }

    const farm = await this.prisma.farm.create({
      data: {
        ...createFarmDto,
        ownerId: id,
      },
    });

    return plainToInstance(FarmResponseDto, farm, {
      excludeExtraneousValues: true,
    });
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
      const ownerResponse = plainToInstance(UserResponseDto, farm.owner, {
        excludeExtraneousValues: true,
      });
      const farmResponse = plainToInstance(FarmResponseDto, farm, {
        excludeExtraneousValues: true,
      });
      farmResponse.owner = ownerResponse;
      return farmResponse;
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

    const ownerResponse = plainToInstance(UserResponseDto, farm.owner, {
      excludeExtraneousValues: true,
    });

    const farmResponse = plainToInstance(FarmResponseDto, farm, {
      excludeExtraneousValues: true,
    });

    farmResponse.owner = ownerResponse;
    return farmResponse;
  }

  async findByOwnerId(ownerId: string) {
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

    const ownerResponse = plainToInstance(UserResponseDto, farm.owner, {
      excludeExtraneousValues: true,
    });

    const farmResponse = plainToInstance(FarmResponseDto, farm, {
      excludeExtraneousValues: true,
    });

    farmResponse.owner = ownerResponse;
    return farmResponse;
  }

  async update({ id }: { id: string }, updateFarmDto: UpdateFarmDto) {
    const farm = await this.prisma.farm.findUnique({ where: { id } });

    if (!farm) {
      throw new NotFoundException(`Không tìm thấy trang trại với ID: ${id}`);
    }

    const updatedFarm = await this.prisma.farm.update({
      where: { id },
      data: updateFarmDto,
    });

    return plainToInstance(FarmResponseDto, updatedFarm, {
      excludeExtraneousValues: true,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
