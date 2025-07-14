import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { PrismaService } from 'src/providers/prisma.service';
import { ScheduleResponseDto } from 'src/common/dto/schedule-response.dto';
import { plainToInstance } from 'class-transformer';
import { FarmResponseDto } from 'src/common/dto/farm-response.dto';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

  private toScheduleResponse(schedule: any): ScheduleResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const farmResponse = plainToInstance(FarmResponseDto, schedule.farm, {
      excludeExtraneousValues: true,
    });

    const scheduleResponse = plainToInstance(ScheduleResponseDto, schedule, {
      excludeExtraneousValues: true,
    });

    scheduleResponse.farm = farmResponse;
    return scheduleResponse;
  }

  async create(
    { id }: { id: string },
    createScheduleDto: CreateScheduleDto,
  ): Promise<{ message: string; schedule: ScheduleResponseDto }> {
    const farm = await this.prisma.farm.findUnique({
      where: { ownerId: id },
      select: { id: true },
    });

    if (!farm) {
      throw new BadRequestException('Không tìm thấy nông trại của bạn');
    }

    const schedule = await this.prisma.schedule.create({
      data: {
        ...createScheduleDto,
        farmId: farm.id,
      },
    });

    return {
      message: 'Tạo lịch trình thành công',
      schedule: this.toScheduleResponse(schedule),
    };
  }

  async findOne(
    id: string,
  ): Promise<{ message: string; schedule: ScheduleResponseDto }> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: { farm: true },
    });

    if (!schedule) {
      throw new BadRequestException('Không tìm thấy lịch trình');
    }

    return {
      message: 'Lấy lịch trình thành công',
      schedule: this.toScheduleResponse(schedule),
    };
  }

  async findByFarmId(
    farmId: string,
  ): Promise<{ message: string; schedule: ScheduleResponseDto }> {
    const schedule = await this.prisma.schedule.findFirst({
      where: { farmId },
      include: { farm: true },
    });

    if (!schedule) {
      throw new Error('Không tìm thấy lịch trình');
    }

    return {
      message: 'Lấy lịch trình thành công',
      schedule: this.toScheduleResponse(schedule),
    };
  }

  async update(
    { id }: { id: string },
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<{ message: string; schedule: ScheduleResponseDto }> {
    const farm = await this.prisma.farm.findUnique({
      where: { ownerId: id },
      select: { id: true },
    });

    if (!farm) {
      throw new BadRequestException('Không tìm thấy nông trại của bạn');
    }

    const schedule = await this.prisma.schedule.update({
      where: { id: farm.id },
      data: {
        ...updateScheduleDto,
        farmId: farm.id,
      },
    });

    return {
      message: 'Cập nhật lịch trình thành công',
      schedule: this.toScheduleResponse(schedule),
    };
  }

  remove(id: string) {
    return `This action removes a #${id} schedule`;
  }
}
