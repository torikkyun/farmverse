import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
      throw new NotFoundException('Không tìm thấy nông trại của bạn');
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
      throw new NotFoundException('Không tìm thấy lịch trình');
    }

    return {
      message: 'Lấy lịch trình thành công',
      schedule: this.toScheduleResponse(schedule),
    };
  }

  async findByFarmId(
    farmId: string,
  ): Promise<{ message: string; schedules: ScheduleResponseDto[] }> {
    const schedules = await this.prisma.schedule.findMany({
      where: { farmId },
      include: { farm: true },
    });

    if (!schedules) {
      throw new NotFoundException('Không tìm thấy lịch trình');
    }

    return {
      message: 'Lấy lịch trình thành công',
      schedules: schedules.map((schedule) => this.toScheduleResponse(schedule)),
    };
  }

  async update(
    { id }: { id: string },
    scheduleId: string,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<{ message: string; schedule: ScheduleResponseDto }> {
    const farm = await this.prisma.farm.findUnique({
      where: { ownerId: id },
      select: { id: true },
    });

    if (!farm) {
      throw new NotFoundException('Không tìm thấy nông trại của bạn');
    }

    const schedule = await this.prisma.schedule.update({
      where: { id: scheduleId },
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

  async remove(
    { id }: { id: string },
    scheduleId: string,
  ): Promise<{ message: string }> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: scheduleId },
      include: { farm: true },
    });

    if (!schedule || !schedule.farm) {
      throw new NotFoundException('Không tìm thấy lịch trình hoặc nông trại');
    }

    if (schedule.farm.ownerId !== id) {
      throw new ForbiddenException('Bạn không có quyền xóa lịch trình này');
    }

    await this.prisma.schedule.delete({
      where: { id: scheduleId },
    });

    return {
      message: 'Xóa lịch trình thành công',
    };
  }
}
