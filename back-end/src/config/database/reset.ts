import { PrismaClient } from 'generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Đang xóa tất cả dữ liệu...');

  await prisma.transaction.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.schedule.deleteMany({});
  await prisma.farm.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Đã xóa tất cả dữ liệu.');
}

main()
  .catch((e) => {
    console.error('Lỗi khi reset cơ sở dữ liệu:', e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
