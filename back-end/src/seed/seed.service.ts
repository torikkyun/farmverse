import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ItemType, UserRole } from 'generated/prisma';
import { PrismaService } from 'src/providers/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const userCount = await this.prisma.user.count();
    const farmCount = await this.prisma.farm.count();
    const itemCount = await this.prisma.item.count();

    if (userCount > 0 || farmCount > 0 || itemCount > 0) {
      this.logger.log('Database đã có dữ liệu, bỏ qua seed.');
      return;
    }

    if (userCount <= 0) {
      await this.userSeed();
    }
    if (farmCount <= 0) {
      await this.farmSeed();
    }
    if (itemCount <= 0) {
      await this.itemSeed();
    }

    this.logger.log('Seed dữ liệu thành công.');
  }

  async userSeed() {
    await this.prisma.user.createMany({
      data: [
        {
          email: 'hoangminh0701@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Hoàng Minh',
          role: UserRole.FARMER,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Hoàng Minh')}`,
          emailVerified: true,
          fvtBalance: 800,
          address: {
            houseNumber: '45',
            street: 'Nguyễn Văn Linh',
            commune: 'Củ Chi',
            city: 'Hồ Chí Minh',
            country: 'Việt Nam',
          },
        },
        {
          email: 'ngocanh0701@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Ngọc Anh',
          role: UserRole.FARMER,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Ngọc Anh')}`,
          emailVerified: true,
          fvtBalance: 1200,
          address: {
            houseNumber: '88',
            street: 'Lê Duẩn',
            commune: 'Bình An',
            province: 'Đồng Nai',
            country: 'Việt Nam',
          },
        },
        {
          email: 'lethanhhoa0701@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Lê Thanh Hòa',
          role: UserRole.TENANT,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Lê Thanh Hòa')}`,
          emailVerified: true,
          fvtBalance: 600,
          address: {
            houseNumber: '12A',
            street: 'Trần Hưng Đạo',
            ward: 'Đồng Xoài',
            province: 'Đồng Nai',
            country: 'Việt Nam',
          },
        },
      ],
    });
  }

  async farmSeed() {
    const users = await this.prisma.user.findMany({
      where: {
        role: UserRole.FARMER,
      },
      select: {
        id: true,
      },
    });

    await this.prisma.farm.createMany({
      data: [
        {
          name: 'Sầu riêng Hoàng Minh',
          address: {
            houseNumber: '45',
            street: 'Nguyễn Văn Linh',
            commune: 'Củ Chi',
            city: 'Hồ Chí Minh',
            country: 'Việt Nam',
          },
          size: 5000,
          description:
            'Sầu riêng Hoàng Minh chuyên cung cấp các loại sầu riêng chất lượng cao, được trồng theo phương pháp hữu cơ, đảm bảo an toàn cho sức khỏe người tiêu dùng.',
          userId: users[0].id,
          schedule: [
            { month: 1, activities: ['Bón phân hữu cơ', 'Tưới nước'] },
            { month: 2, activities: ['Kiểm tra sâu bệnh', 'Tỉa cành'] },
            { month: 3, activities: ['Bón phân NPK', 'Tưới nước'] },
            { month: 4, activities: ['Chuẩn bị thu hoạch', 'Tưới nước'] },
            { month: 5, activities: ['Thu hoạch', 'Bón phân sau thu hoạch'] },
            { month: 6, activities: ['Kiểm tra sâu bệnh', 'Tưới nước'] },
            { month: 7, activities: ['Tỉa cành', 'Bón phân hữu cơ'] },
            { month: 8, activities: ['Kiểm tra sâu bệnh', 'Tưới nước'] },
            { month: 9, activities: ['Bón phân NPK', 'Tưới nước'] },
            { month: 10, activities: ['Kiểm tra sâu bệnh', 'Tưới nước'] },
            { month: 11, activities: ['Tỉa cành', 'Bón phân hữu cơ'] },
            { month: 12, activities: ['Kiểm tra sâu bệnh', 'Tưới nước'] },
          ],
        },
        {
          name: 'Vườn xoài Ngọc Anh',
          address: {
            houseNumber: '88',
            street: 'Lê Duẩn',
            commune: 'Bình An',
            province: 'Đồng Nai',
            country: 'Việt Nam',
          },
          size: 3000,
          description:
            'Vườn xoài Ngọc Anh chuyên cung cấp các loại xoài tươi ngon, được trồng theo tiêu chuẩn hữu cơ, đảm bảo chất lượng và an toàn cho sức khỏe người tiêu dùng.',
          userId: users[1].id,
          schedule: [
            { month: 1, activities: ['Bón phân hữu cơ', 'Tưới nước'] },
            { month: 2, activities: ['Kiểm tra sâu bệnh', 'Tỉa cành'] },
            { month: 3, activities: ['Bón phân NPK', 'Tưới nước'] },
            { month: 4, activities: ['Chuẩn bị thu hoạch', 'Tưới nước'] },
            { month: 5, activities: ['Thu hoạch', 'Bón phân sau thu hoạch'] },
            { month: 6, activities: ['Kiểm tra sâu bệnh', 'Tưới nước'] },
            { month: 7, activities: ['Tỉa cành', 'Bón phân hữu cơ'] },
            { month: 8, activities: ['Kiểm tra sâu bệnh', 'Tưới nước'] },
            { month: 9, activities: ['Bón phân NPK', 'Tưới nước'] },
            { month: 10, activities: ['Kiểm tra sâu bệnh', 'Tưới nước'] },
            { month: 11, activities: ['Tỉa cành', 'Bón phân hữu cơ'] },
            { month: 12, activities: ['Kiểm tra sâu bệnh', 'Tưới nước'] },
          ],
        },
      ],
    });
  }

  async itemSeed() {
    const farms = await this.prisma.farm.findMany({
      select: {
        id: true,
      },
    });

    await this.prisma.item.createMany({
      data: [
        {
          name: 'Phân bón Đầu Trâu NPK 16-16-8',
          description:
            'Phân bón Đầu Trâu NPK chất lượng cao, cân đối đạm - lân - kali, phù hợp hầu hết các loại cây trồng.',
          price: 120,
          images: [
            'https://th.bing.com/th/id/R.bfb6c45da388bd63c52e5ddc220f2d1b?rik=UmLAOrrClPK1Bg&riu=http%3a%2f%2fphanbonthuyngan.com%2fwp-content%2fuploads%2f2021%2f02%2fnpk-16-16-8_1.jpg&ehk=WrZfwL7s1qDnDDVEpPRWHaHtzy%2fRvEuas9FeBhbqVM0%3d&risl=&pid=ImgRaw&r=0',
          ],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 200,
          details: {
            formula: 'NPK 16-16-8',
            nitrogen: '16%',
            phosphorus: '16%',
            potassium: '8%',
            usage:
              'Bón lót trước khi gieo 20 - 30 kg/1.000 m², thúc 15 - 20 kg/1.000 m²',
            weightKg: 25,
            applicationStage: 'Bón lót và thúc 1 - 2 lần trong vụ',
          },
        },
        {
          name: 'Phân đạm Ure 46%',
          description:
            'Phân đạm dạng hạt có hàm lượng đạm cao, tan nhanh, thúc đẩy sinh trưởng mạnh.',
          price: 95,
          images: [
            'https://th.bing.com/th/id/R.bfb6c45da388bd63c52e5ddc220f2d1b?rik=UmLAOrrClPK1Bg&riu=http%3a%2f%2fphanbonthuyngan.com%2fwp-content%2fuploads%2f2021%2f02%2fnpk-16-16-8_1.jpg&ehk=WrZfwL7s1qDnDDVEpPRWHaHtzy%2fRvEuas9FeBhbqVM0%3d&risl=&pid=ImgRaw&r=0',
          ],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 300,
          details: {
            formula: 'CO(NH₂)₂',
            nitrogen: '46%',
            phosphorus: '0%',
            potassium: '0%',
            usage: 'Rải gốc 50 - 100 kg/ha, chia làm 2 - 3 đợt thúc',
            weightKg: 50,
            applicationStage: 'Thúc 2 - 3 lần, mỗi lần cách nhau 15 - 20 ngày',
          },
        },
        {
          name: 'Phân supe lân nung chảy 16%',
          description:
            'Phân lân nung chảy cao cấp, giàu photpho, tăng khả năng đậu trái và nuôi hoa quả.',
          price: 110,
          images: [
            'https://media3.scdn.vn/img2/2018/11_8/vq18qu_simg_b5529c_250x250_maxb.jpg',
          ],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 150,
          details: {
            formula: 'Ca(H₂PO₄)₂',
            nitrogen: '0%',
            phosphorus: '16%',
            potassium: '0%',
            usage: 'Bón lót 80 - 120 kg/ha trước khi gieo/trồng',
            weightKg: 50,
            applicationStage:
              'Bón lót đầu vụ, kết hợp bón thúc khi cây trổ hoa',
          },
        },
        {
          name: 'Phân hữu cơ vi sinh (Vermicompost)',
          description:
            'Phân hữu cơ vi sinh ủ từ phân trùn quế, cải thiện kết cấu đất, tăng vi sinh vật có lợi.',
          price: 180,
          images: [
            'https://tse3.mm.bing.net/th/id/OIP.CCVyr_0qz23L7zEQOMeqiQHaMY?rs=1&pid=ImgDetMain&o=7&rm=3',
          ],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 80,
          details: {
            formula: 'Hữu cơ vi sinh',
            nitrogen: '2%',
            phosphorus: '1.5%',
            potassium: '2%',
            usage: 'Rải gốc 10 - 15 tấn/ha hoặc 1 - 2 kg/cây cà phê',
            weightKg: 50,
            applicationStage: 'Bón gốc đầu vụ và giữa vụ',
          },
        },
        {
          name: 'Phân bón lá SuperGro',
          description:
            'Phân bón lá cao cấp, tan nhanh, giúp cây hấp thụ trực tiếp qua lá, cải thiện màu xanh lá.',
          price: 250000,
          images: [
            'https://tse4.mm.bing.net/th/id/OIP.6ya9MQtmoh55XUrOP6thCQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
          ],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 120,
          details: {
            formula: 'N-P-K 15-5-30',
            nitrogen: '15%',
            phosphorus: '5%',
            potassium: '30%',
            usage: 'Pha 1 - 2 g/lít nước, phun 2 - 3 lần/vụ',
            weightKg: 1,
            applicationStage:
              'Phun lá khi cây cao 20 - 30 cm và giai đoạn làm quả',
          },
        },
      ],
    });

    await this.prisma.item.createMany({
      data: [
        {
          farmId: farms[0].id,
          name: 'Cây sầu riêng',
          type: ItemType.TREE,
          description:
            'Cây sầu riêng chất lượng cao, trái to, múi dày, vị ngọt.',
          images: [
            'https://th.bing.com/th/id/R.f8ea8c40cdead4e44f25a0c866b3f021?rik=GohkeybcLR4k6Q&pid=ImgRaw&r=0',
          ],
          price: 500,
          stock: 20,
          details: {
            species: 'Durio',
            output: '2000 - 3000 kg/ha',
            harvestTime: {
              start: 5,
              end: 8,
            },
            soilType: 'Đất phù sa, đất đỏ bazan',
            pests: ['Sâu đục thân', 'Rệp sáp', 'Bọ trĩ'],
          },
        },
      ],
    });
  }
}
