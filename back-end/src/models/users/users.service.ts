import { Injectable, NotFoundException, Search } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User, UserRole } from 'generated/prisma';
import { PrismaService } from 'src/providers/prisma.service';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SearchUsersQueryDto } from './dto/search-user.dto';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from 'src/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    page,
    pageSize,
    search,
    role,
  }: SearchUsersQueryDto): Promise<PaginationResponseDto<UserResponseDto>> {
    const skip = (page - 1) * pageSize;
    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    const [users, totalItems] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: pageSize,
      }),
      this.prisma.user.count({ where }),
    ]);

    const meta = new PaginationMetaDto(page, pageSize, totalItems);
    const items = plainToInstance(UserResponseDto, users, {
      excludeExtraneousValues: true,
    });

    return new PaginationResponseDto(items, meta);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với ID: ${id}`);
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    { id }: { id: string },
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: user,
    });

    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async changePassword(
    { id }: { id: string },
    { newPassword, confirmNewPassword }: ChangePasswordDto,
  ): Promise<{ message: string; user: UserResponseDto }> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    if (newPassword !== confirmNewPassword) {
      throw new NotFoundException(
        'Mật khẩu mới và xác nhận mật khẩu không khớp',
      );
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });

    return {
      message: 'Đổi mật khẩu thành công',
      user: plainToInstance(UserResponseDto, updatedUser, {
        excludeExtraneousValues: true,
      }),
    };
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
