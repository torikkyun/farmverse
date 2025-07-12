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
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UserRole } from 'generated/prisma';
import { Public } from 'src/common/decorators/public.decorator';
import { ScheduleResponseDto } from 'src/common/dto/schedule-response.dto';

@Controller('api/schedule')
@ApiTags('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiBearerAuth()
  create(
    @CurrentUser() user: { id: string; role: UserRole },
    @Body(new ValidationPipe()) createScheduleDto: CreateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    return this.scheduleService.create(user, createScheduleDto);
  }

  @Get(':scheduleId')
  @Public()
  findOne(@Param('scheduleId') scheduleId: string) {
    return this.scheduleService.findOne(scheduleId);
  }

  @Get()
  @Public()
  findByFarmId(@Query('farmId') farmId: string) {
    return this.scheduleService.findByFarmId(farmId);
  }

  @Patch()
  @ApiBearerAuth()
  update(
    @CurrentUser() user: { id: string; role: UserRole },
    @Body(new ValidationPipe()) updateScheduleDto: UpdateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    return this.scheduleService.update(user, updateScheduleDto);
  }

  @Delete(':scheduleId')
  @ApiBearerAuth()
  remove(@Param('scheduleId') scheduleId: string) {
    return this.scheduleService.remove(scheduleId);
  }
}
