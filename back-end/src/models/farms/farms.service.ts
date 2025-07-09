import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmResponseDto } from 'src/common/dto/farm-response.dto';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class FarmsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFarmDto: CreateFarmDto) {
    return 'This action adds a new farm';
  }

  findAll() {
    return `This action returns all farms`;
  }

  async findOne(id: string): Promise<FarmResponseDto> {
    const farm = await this.prisma.farm.findUnique({ where: { id } });

    if (!farm) {
      throw new NotFoundException(`Không tìm thấy trang trại với ID: ${id}`);
    }

    return plainToInstance(FarmResponseDto, farm, {
      excludeExtraneousValues: true,
    });
  }

  update({ id }: { id: string }, updateFarmDto: UpdateFarmDto) {
    return `This action updates a #${id} farm`;
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
