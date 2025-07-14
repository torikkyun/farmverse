import { PrismaClient, UserRole } from '../../../generated/prisma';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Đang tạo dữ liệu...');

  // Seed Users
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash('123456', 10),
        phone: faker.phone.number(),
        role: i % 2 === 0 ? UserRole.FARMER : UserRole.TENANT,
        avatar: faker.image.avatar(),
        isEmailVerified: true,
      },
    });

    console.log(`Đã tạo user: ${user.email}`);
  }

  const farmers = await prisma.user.findMany({
    where: { role: UserRole.FARMER },
  });

  if (farmers.length === 0) {
    throw new Error('Không có user nào với role FARMER');
  }

  // Seed Farms
  for (let i = 0; i < 5; i++) {
    const farm = await prisma.farm.create({
      data: {
        name: faker.company.name(),
        location: faker.location.city(),
        size: faker.number.float({ min: 1, max: 100 }),
        description: faker.lorem.sentence(),
        images: [
          faker.image.urlLoremFlickr({ category: 'nature' }),
          faker.image.urlLoremFlickr({ category: 'nature' }),
        ],
        owner: {
          connect: {
            id: farmers[i % farmers.length].id,
          },
        },
      },
    });

    console.log(`Đã tạo farm: ${farm.name}`);
  }

  console.log('Đã hoàn thành việc tạo dữ liệu!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
