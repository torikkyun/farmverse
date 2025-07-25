import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationResponseDto } from '@app/common/dto/pagination.dto';
import { UserResponseDto } from '@app/common/dto/response/user.dto';
import { SearchUsersQueryDto } from './dto/search-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { ValidationPipe } from '@nestjs/common';
import { Public } from '@app/common/decorators/public.decorator';
import { LocalGuard } from '@app/common/guards/local.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@app/common/pipes/file-validation.pipe';

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
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  update(
    @CurrentUser() user: { id: string },
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile(new FileValidationPipe()) avatar?: Express.Multer.File,
  ): Promise<{ message: string; user: UserResponseDto }> {
    return this.usersService.update(user, updateUserDto, avatar);
  }

  @Patch('change-password')
  @UseGuards(LocalGuard)
  @ApiBearerAuth()
  changePassword(
    @CurrentUser() user: { id: string },
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string; user: UserResponseDto }> {
    return this.usersService.changePassword(user, changePasswordDto);
  }
}
