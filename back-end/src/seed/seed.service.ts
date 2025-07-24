import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UserRole } from 'generated/prisma';
import { PrismaService } from 'src/providers/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const userCount = await this.prisma.user.count();
    if (userCount > 0) {
      this.logger.log('Database đã có dữ liệu, bỏ qua seed.');
      return;
    }

    await this.prisma.user.createMany({
      data: [
        {
          email: 'anhkhoi123@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Lê Anh Khôi',
          role: UserRole.FARMER,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Lê Anh Khôi')}`,
          emailVerified: true,
          fvtBalance: 1000,
          address: {
            houseNumber: '10',
            street: 'Huỳnh Văn Nghệ',
            commune: 'Phường Trấn Biên',
            province: 'Đồng Nai',
            country: 'Việt Nam',
          },
        },
        {
          email: 'nduc42176@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Trần Đình Phúc Đức',
          role: UserRole.FARMER,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Trần Đình Phúc Đức')}`,
          emailVerified: true,
          fvtBalance: 500,
          address: {
            houseNumber: '10',
            street: 'Huỳnh Văn Nghệ',
            commune: 'Phường Trấn Biên',
            province: 'Đồng Nai',
            country: 'Việt Nam',
          },
        },
      ],
    });

    this.logger.log('Seed dữ liệu thành công!');
  }
}
