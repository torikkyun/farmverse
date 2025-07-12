import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { SearchUsersQueryDto } from './dto/search-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalGuard } from 'src/common/guards/local.guard';

@Controller('api/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  findAll(
    @Query(new ValidationPipe()) searchUsersQueryDto: SearchUsersQueryDto,
  ): Promise<PaginationResponseDto<UserResponseDto>> {
    return this.usersService.findAll(searchUsersQueryDto);
  }

  @Get(':userId')
  @Public()
  findOne(
    @Param('userId') userId: string,
  ): Promise<{ message: string; user: UserResponseDto }> {
    return this.usersService.findOne(userId);
  }

  @Patch()
  @ApiBearerAuth()
  update(
    @CurrentUser() user: { id: string },
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<{ message: string; user: UserResponseDto }> {
    return this.usersService.update(user, updateUserDto);
  }

  @Patch('change-password')
  @UseGuards(LocalGuard)
  @ApiBearerAuth()
  changePassword(
    @CurrentUser() user: { id: string },
    @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string; user: UserResponseDto }> {
    return this.usersService.changePassword(user, changePasswordDto);
  }

  // @Delete()
  // @ApiBearerAuth()
  // remove(@CurrentUser() { id }: User) {
  //   console.log(id);
  // }
}
