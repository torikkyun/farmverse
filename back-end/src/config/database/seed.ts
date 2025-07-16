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
        fvtBalance: faker.number.int({ min: 0, max: 1000 }),
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

    for (let k = 0; k < 3; k++) {
      const schedule = await prisma.schedule.create({
        data: {
          name: faker.lorem.words({ min: 2, max: 4 }),
          description: faker.lorem.sentence(),
          startTime: faker.date.soon({ days: 1 + k }),
          endTime: faker.date.soon({ days: 10 + k }),
          status: faker.datatype.boolean(),
          farm: { connect: { id: farm.id } },
        },
      });
      console.log(`Đã tạo schedule ${k + 1} cho farm: ${farm.name}`);
    }

    // Tạo items cho farm vừa tạo
    for (let j = 0; j < 5; j++) {
      const item = await prisma.item.create({
        data: {
          name: faker.commerce.productName(),
          type: j % 2 === 0 ? 'FERTILIZER' : 'TREEROOT',
          description: faker.commerce.productDescription(),
          images: [
            faker.image.urlLoremFlickr({ category: 'food' }),
            faker.image.urlLoremFlickr({ category: 'plants' }),
          ],
          price: faker.number.int({ min: 10, max: 100 }),
          quantity: faker.number.int({ min: 1, max: 50 }),
          farm: { connect: { id: farm.id } },
        },
      });
      console.log(`Đã tạo item: ${item.name}`);
    }
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
