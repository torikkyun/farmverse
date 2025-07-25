import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();

  await prisma.rentedTree.deleteMany({});
  await prisma.transaction.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.farm.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.otp.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.$disconnect();
  console.log('Đã reset database thành công!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
