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
        // FARMER
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
          role: UserRole.FARMER,
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
        {
          email: 'hoanganh2025@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Hoàng Anh',
          role: UserRole.FARMER,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Hoàng Anh')}`,
          emailVerified: true,
          fvtBalance: 700,
          address: {
            houseNumber: '101',
            street: 'Lê Duẩn',
            ward: 'Hải Châu 1',
            province: 'Đà Nẵng',
            country: 'Việt Nam',
          },
        },
        {
          email: 'thutrangx@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Thư Trang',
          role: UserRole.FARMER,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Thư Trang')}`,
          emailVerified: true,
          fvtBalance: 800,
          address: {
            houseNumber: '67',
            street: 'Trường Chinh',
            ward: 'Phường 15',
            province: 'TP. Hồ Chí Minh',
            country: 'Việt Nam',
          },
        },
        // TENANT
        {
          email: 'dungpham999@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Đức Phạm',
          role: UserRole.TENANT,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Đức Phạm')}`,
          emailVerified: true,
          fvtBalance: 900,
          address: {
            houseNumber: '12C',
            street: 'Lý Thường Kiệt',
            ward: 'Vĩnh Tuy',
            province: 'Hà Nội',
            country: 'Việt Nam',
          },
        },
        {
          email: 'kiet.le.it@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Kiệt Lê',
          role: UserRole.TENANT,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Kiệt Lê')}`,
          emailVerified: true,
          fvtBalance: 1000,
          address: {
            houseNumber: '89',
            street: 'Phạm Văn Đồng',
            ward: 'Tân Phú',
            province: 'Đồng Nai',
            country: 'Việt Nam',
          },
        },
        {
          email: 'ngoctram.08@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Ngọc Trâm',
          role: UserRole.TENANT,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Ngọc Trâm')}`,
          emailVerified: true,
          fvtBalance: 1100,
          address: {
            houseNumber: '3A',
            street: 'Nguyễn Trãi',
            ward: 'An Phú',
            province: 'Bình Dương',
            country: 'Việt Nam',
          },
        },
        {
          email: 'tuananh.pro@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Tuấn Anh',
          role: UserRole.TENANT,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Tuấn Anh')}`,
          emailVerified: true,
          fvtBalance: 1200,
          address: {
            houseNumber: '45D',
            street: 'Điện Biên Phủ',
            ward: 'Tân Bình',
            province: 'TP. Hồ Chí Minh',
            country: 'Việt Nam',
          },
        },
        {
          email: 'quyennguyenx@gmail.com',
          password: await bcrypt.hash('123456', 10),
          name: 'Quyền Nguyễn',
          role: UserRole.TENANT,
          avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent('Quyền Nguyễn')}`,
          emailVerified: true,
          fvtBalance: 1300,
          address: {
            houseNumber: '56B',
            street: 'Ngô Quyền',
            ward: 'Minh An',
            province: 'Quảng Nam',
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
        {
          name: 'Xoài Cát Hòa Lộc Ba Tri',
          address: {
            houseNumber: '12',
            street: 'Tỉnh lộ 885',
            commune: 'An Hiệp',
            city: 'Bến Tre',
            country: 'Việt Nam',
          },
          size: 4500,
          description:
            'Xoài Cát Hòa Lộc Ba Tri được trồng theo hướng hữu cơ, nổi tiếng với vị ngọt thanh, ít xơ và được ưa chuộng trong nước lẫn xuất khẩu.',
          userId: users[2].id,
          schedule: [
            { month: 1, activities: ['Tỉa cành', 'Bón phân hữu cơ'] },
            { month: 2, activities: ['Tưới nước', 'Phun thuốc nấm'] },
            { month: 3, activities: ['Ra hoa', 'Bón phân NPK'] },
            { month: 4, activities: ['Chăm sóc trái', 'Tưới nước'] },
            { month: 5, activities: ['Thu hoạch', 'Bón phân sau thu hoạch'] },
            { month: 6, activities: ['Tưới nước', 'Kiểm tra sâu bệnh'] },
            { month: 7, activities: ['Tỉa cành', 'Bón phân hữu cơ'] },
            { month: 8, activities: ['Tưới nước', 'Cắt bỏ trái non'] },
            { month: 9, activities: ['Bón phân NPK', 'Tưới nước'] },
            { month: 10, activities: ['Chống đổ ngã', 'Tưới nước'] },
            { month: 11, activities: ['Tỉa cành', 'Tưới ẩm'] },
            { month: 12, activities: ['Chuẩn bị ra hoa', 'Tưới nước'] },
          ],
        },
        {
          name: 'Bưởi Năm Roi Bình Minh',
          address: {
            houseNumber: '98',
            street: 'QL54',
            commune: 'Đông Bình',
            city: 'Vĩnh Long',
            country: 'Việt Nam',
          },
          size: 6000,
          description:
            'Bưởi Năm Roi Bình Minh có vị ngọt thanh, mọng nước, không hạt, đạt tiêu chuẩn VietGAP và GlobalGAP phục vụ thị trường xuất khẩu.',
          userId: users[3].id,
          schedule: [
            { month: 1, activities: ['Tưới nước', 'Bón phân hữu cơ'] },
            { month: 2, activities: ['Phun thuốc nấm', 'Tỉa cành'] },
            { month: 3, activities: ['Xử lý ra hoa', 'Bón phân NPK'] },
            { month: 4, activities: ['Tưới nước', 'Bảo vệ trái non'] },
            { month: 5, activities: ['Bón phân kali', 'Tưới nước'] },
            { month: 6, activities: ['Thu hoạch', 'Tỉa cành'] },
            { month: 7, activities: ['Bón phân hữu cơ', 'Tưới nước'] },
            {
              month: 8,
              activities: ['Kiểm tra sâu bệnh', 'Phun thuốc sinh học'],
            },
            { month: 9, activities: ['Ra hoa', 'Bón phân'] },
            { month: 10, activities: ['Chăm sóc trái', 'Tưới nước'] },
            { month: 11, activities: ['Thu hoạch', 'Cắt bỏ trái hư'] },
            { month: 12, activities: ['Tưới ẩm', 'Bón phân hữu cơ'] },
          ],
        },
        {
          name: 'Vú sữa Lò Rèn Vĩnh Kim',
          address: {
            houseNumber: '27',
            street: 'Tỉnh lộ 872',
            commune: 'Vĩnh Kim',
            city: 'Tiền Giang',
            country: 'Việt Nam',
          },
          size: 3500,
          description:
            'Vú sữa Lò Rèn Vĩnh Kim có vỏ mỏng, cơm dày, ngọt dịu, được bảo hộ chỉ dẫn địa lý và xuất khẩu sang thị trường Mỹ.',
          userId: users[4].id,
          schedule: [
            { month: 1, activities: ['Tưới nước', 'Tỉa cành'] },
            { month: 2, activities: ['Bón phân hữu cơ', 'Kiểm tra sâu bệnh'] },
            { month: 3, activities: ['Ra hoa', 'Phun thuốc nấm'] },
            { month: 4, activities: ['Chăm sóc trái non', 'Tưới nước'] },
            { month: 5, activities: ['Tưới nước', 'Tỉa trái'] },
            { month: 6, activities: ['Bón phân NPK', 'Tưới nước'] },
            { month: 7, activities: ['Bón phân kali', 'Tưới nước'] },
            { month: 8, activities: ['Theo dõi trái', 'Tưới nước'] },
            { month: 9, activities: ['Thu hoạch', 'Bón phân sau thu hoạch'] },
            { month: 10, activities: ['Tỉa cành', 'Tưới nước'] },
            { month: 11, activities: ['Bón phân hữu cơ', 'Tưới nước'] },
            { month: 12, activities: ['Chuẩn bị ra hoa', 'Tưới ẩm'] },
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
        {
          name: 'Phân DAP 18-46',
          description:
            'Phân DAP cao cấp giúp phát triển rễ, tăng khả năng hấp thu dinh dưỡng và kích thích ra hoa sớm.',
          price: 135,
          images: [
            'https://tuongnguyen.vn/wp-content/uploads/2025/04/DAP-Nga.jpg',
          ],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 250,
          details: {
            formula: 'DAP 18-46',
            nitrogen: '18%',
            phosphorus: '46%',
            potassium: '0%',
            usage: 'Bón lót 100–150 kg/ha cho cây ăn quả, rau màu',
            weightKg: 25,
            applicationStage: 'Bón lót đầu vụ hoặc trước khi trồng',
          },
        },
        {
          name: 'Phân Kali Clorua (KCl) 61%',
          description:
            'Phân Kali cung cấp K giúp cây chắc thân, tăng cường khả năng chống bệnh và nâng cao chất lượng quả.',
          price: 140,
          images: [
            'https://vietnga.vn/wp-content/uploads/2022/10/Kali-61-MT-1-1024x1024.jpg',
          ],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 180,
          details: {
            formula: 'KCl 61%',
            nitrogen: '0%',
            phosphorus: '0%',
            potassium: '61%',
            usage: 'Bón thúc 30–50 kg/ha cho cây ăn trái, hoa màu',
            weightKg: 25,
            applicationStage: 'Giai đoạn phát triển quả và sau thu hoạch',
          },
        },
        {
          name: 'Phân NPK 20-20-15+TE',
          description:
            'Phân tổng hợp cao cấp với tỷ lệ đạm, lân, kali cân bằng cùng vi lượng, giúp cây sinh trưởng toàn diện.',
          price: 160,
          images: ['https://binhdien.com/images/npk-dau-trau/201.jpg'],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 220,
          details: {
            formula: 'NPK 20-20-15 + TE',
            nitrogen: '20%',
            phosphorus: '20%',
            potassium: '15%',
            usage: 'Bón thúc định kỳ 2–3 lần/vụ',
            weightKg: 25,
            applicationStage: 'Từ giai đoạn cây phát triển lá đến ra hoa',
          },
        },
        {
          name: 'Phân vi lượng Bo – Chelate',
          description:
            'Phân vi lượng Bo dạng Chelate giúp cải thiện khả năng đậu trái, hạn chế rụng hoa và méo quả.',
          price: 90,
          images: [
            'https://biovina.com.vn/wp-content/uploads/2021/03/chelate.jpg',
          ],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 100,
          details: {
            formula: 'Bo (Chelate)',
            nitrogen: '0%',
            phosphorus: '0%',
            potassium: '0%',
            usage: 'Pha 5g/10 lít nước, phun định kỳ 10–15 ngày/lần',
            weightKg: 1,
            applicationStage: 'Trước và sau khi cây trổ hoa',
          },
        },
        {
          name: 'Phân trung lượng Canxi - Magie (Ca-Mg)',
          description:
            'Phân trung lượng chứa Canxi và Magie giúp cải tạo đất, hạn chế rụng trái và tăng độ ngọt quả.',
          price: 115,
          images: [
            'https://phanbondainghia.com/upload/product/z54135998847597b8b47fca2d2af2f8382e3e633996dec-2553.jpg',
          ],
          farmId: farms[0].id,
          type: ItemType.FERTILIZER,
          stock: 130,
          details: {
            formula: 'CaO 15% - MgO 8%',
            nitrogen: '0%',
            phosphorus: '0%',
            potassium: '0%',
            usage: 'Bón rải gốc 200–300 kg/ha, định kỳ 1–2 tháng/lần',
            weightKg: 25,
            applicationStage: 'Giai đoạn nuôi trái và cải tạo đất',
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
        {
          farmId: farms[0].id,
          name: 'Cây xoài Cát Hòa Lộc',
          type: ItemType.TREE,
          description:
            'Xoài Cát Hòa Lộc nổi tiếng với vị ngọt thanh, ít xơ, thơm ngon và trái lớn.',
          images: [
            'https://cayantraidetrong.com/wp-content/uploads/2021/12/cay-xoai-cat-hoa-loc-6.jpg',
          ],
          price: 320,
          stock: 35,
          details: {
            species: 'Mangifera indica',
            output: '1500 - 2500 kg/ha',
            harvestTime: {
              start: 4,
              end: 6,
            },
            soilType: 'Đất cát pha, đất phù sa',
            pests: ['Ruồi đục trái', 'Sâu ăn lá', 'Nấm hồng'],
          },
        },
        {
          farmId: farms[0].id,
          name: 'Cây chôm chôm Java',
          type: ItemType.TREE,
          description:
            'Chôm chôm Java có vỏ đỏ rực, gai mềm, vị ngọt và thơm, rất được ưa chuộng tại miền Nam.',
          images: [
            'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/16/1229505/CHOM---CHOM-2.jpg',
          ],
          price: 290,
          stock: 25,
          details: {
            species: 'Nephelium lappaceum',
            output: '2000 - 3000 kg/ha',
            harvestTime: {
              start: 6,
              end: 8,
            },
            soilType: 'Đất thịt nhẹ, thoát nước tốt',
            pests: ['Rầy mềm', 'Sâu cuốn lá', 'Nấm anthracnose'],
          },
        },
        {
          farmId: farms[0].id,
          name: 'Cây bưởi da xanh',
          type: ItemType.TREE,
          description:
            'Bưởi da xanh có vỏ mỏng, múi hồng, vị ngọt thanh mát, ít hạt, cho năng suất cao.',
          images: [
            'https://image-general.sittovietnam.vn/uploads/images/0554F173-26BE-4A13-8499-94A96777B1FA/0f88b3d2-1cc2-4e31-a671-ea6302bc913e.jpg',
          ],
          price: 450,
          stock: 15,
          details: {
            species: 'Citrus maxima',
            output: '1800 - 2500 kg/ha',
            harvestTime: {
              start: 8,
              end: 11,
            },
            soilType: 'Đất thịt pha cát, thoát nước tốt',
            pests: ['Sâu vẽ bùa', 'Ruồi vàng', 'Nấm phytophthora'],
          },
        },
        {
          farmId: farms[0].id,
          name: 'Cây măng cụt Thái Lan',
          type: ItemType.TREE,
          description:
            'Măng cụt Thái có vị ngọt dịu, vỏ mỏng, ruột trắng dày và là loại trái cây nhiệt đới cao cấp.',
          images: [
            'https://kimnonggoldstar.vn/wp-content/uploads/2023/05/ky-thuat-trong-mang-cut-dat-hieu-qua-cao-kimnonggoldstar-vn-5.jpg',
          ],
          price: 520,
          stock: 18,
          details: {
            species: 'Garcinia mangostana',
            output: '1200 - 2000 kg/ha',
            harvestTime: {
              start: 6,
              end: 9,
            },
            soilType: 'Đất mùn ẩm, thoáng khí',
            pests: ['Sâu đục quả', 'Rệp sáp', 'Nấm mốc đen'],
          },
        },
        {
          farmId: farms[0].id,
          name: 'Cây mít Thái siêu sớm',
          type: ItemType.TREE,
          description:
            'Mít Thái siêu sớm dễ trồng, cho trái nhanh, cơm dày, thơm ngọt, ít xơ.',
          images: [
            'https://bizweb.dktcdn.net/100/422/567/files/7-30c66954-b9fb-4a27-a6d9-d215a1bae0a3.png?v=1642642391854',
          ],
          price: 310,
          stock: 30,
          details: {
            species: 'Artocarpus heterophyllus',
            output: '2500 - 3500 kg/ha',
            harvestTime: {
              start: 7,
              end: 10,
            },
            soilType: 'Đất thịt nhẹ, thoát nước tốt',
            pests: ['Sâu đục thân', 'Ruồi vàng', 'Nấm tán trắng'],
          },
        },
      ],
    });
  }
}
