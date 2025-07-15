import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { SearchUsersQueryDto } from './dto/search-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ValidationPipe } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalGuard } from 'src/common/guards/local.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import { createReadStream } from 'fs';
import { Response } from 'express';

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

  @Get('avatar/:fileName')
  @Public()
  getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const file = createReadStream(
      join(process.cwd(), 'static/avatars', fileName),
    );
    file.pipe(res);
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './static/avatars',
        filename: (req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const newFileName = `${uuidv4()}${fileExtName}`;
          cb(null, newFileName);
        },
      }),
    }),
  )
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

  // @Delete()
  // @ApiBearerAuth()
  // remove(@CurrentUser() { id }: User) {
  //   console.log(id);
  // }
}
