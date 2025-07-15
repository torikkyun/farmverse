import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserRole } from 'generated/prisma';
import { Public } from 'src/common/decorators/public.decorator';
import { ScheduleResponseDto } from 'src/common/dto/schedule-response.dto';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('api/schedules')
@ApiTags('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  @Roles(UserRole.FARMER)
  @ApiBearerAuth()
  create(
    @CurrentUser() user: { id: string },
    @Body() createScheduleDto: CreateScheduleDto,
  ): Promise<{ message: string; schedule: ScheduleResponseDto }> {
    return this.schedulesService.create(user, createScheduleDto);
  }

  @Get(':scheduleId')
  @Public()
  findOne(
    @Param('scheduleId') scheduleId: string,
  ): Promise<{ message: string; schedule: ScheduleResponseDto }> {
    return this.schedulesService.findOne(scheduleId);
  }

  @Get()
  @Public()
  findByFarmId(
    @Query('farmId') farmId: string,
  ): Promise<{ message: string; schedule: ScheduleResponseDto }> {
    return this.schedulesService.findByFarmId(farmId);
  }

  @Patch()
  @Roles(UserRole.FARMER)
  @ApiBearerAuth()
  update(
    @CurrentUser() user: { id: string },
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<{ message: string; schedule: ScheduleResponseDto }> {
    return this.schedulesService.update(user, updateScheduleDto);
  }

  // @Delete(':scheduleId')
  // @ApiBearerAuth()
  // remove(
  //   @Param('scheduleId') scheduleId: string,
  // ): Promise<{ message: string }> {
  //   return this.schedulesService.remove(scheduleId);
  // }
}
