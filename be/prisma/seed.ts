import { PrismaClient, TransactionStatus } from '@prisma/client';

import { faker } from '@faker-js/faker';
import { hashPassword } from '../src/utils/helper';

const prisma = new PrismaClient();
const brandData = [
  'Alfa Romeo',
  'Aston Martin',
  'Audi',
  'Austin',
  'BAC',
  'Bentley',
  'Bison',
  'BMW',
  'Borgward',
  'Brabus',
  'Bufori',
  'Cadillac',
  'CAM',
  'Chana',
  'Changan',
  'Chery',
  'Chevrolet',
  'Chrysler',
  'Citroen',
  'Daihatsu',
  'Datsun',
  'Dodge',
  'Dongfeng',
  'DS',
  'Ferrari',
  'Fiat',
  'Foday',
  'Ford',
  'Foton',
  'Great Wall',
  'Haval',
  'Hicom',
  'Hino',
  'Honda',
  'Huanghai',
  'Hummer',
  'Hyundai',
  'Impul',
  'Infiniti',
  'Inokom',
  'Isuzu',
  'JAC',
  'Jaguar',
  'JBC',
  'Jeep',
  'JMC',
  'Joylong',
  'Kia',
  'King Long Xiamen',
  'Lamborghini',
  'Land Rover',
  'Lexus',
  'LMG',
  'Lotus',
  'Mahindra',
  'Maserati',
  'Maxus',
  'Mazda',
  'McLaren',
  'Mercedes-AMG',
  'Mercedes-Benz',
  'Mercedes-Maybach',
  'MG',
  'Mini',
  'Mitsubishi',
  'Mitsuoka',
  'Morris',
  'Naza',
  'Nissan',
  'Opel',
  'Perodua',
  'Peugeot',
  'Porsche',
  'Proton',
  'RAM',
  'Renault',
  'Rolls-Royce',
  'Rover',
  'Saab',
  'Shenyang Brilliance',
  'Skoda',
  'Smart',
  'Ssangyong',
  'Subaru',
  'Suzuki',
  'Tata',
  'TD2000',
  'Tesla',
  'Toyota',
  'TVR',
  'Volkswagen',
  'Volvo',
  'Wald',
];

const totalModel = 200;
const totalTransactions = 7000;

async function seedMain() {
  await prisma.users.createMany({
    data: [
      {
        email: 'sinceritymaiden@hotmail.com',
        name: 'Vincent',
        password: await hashPassword('88888888'),
      },
    ],
  });

  await prisma.brands.createMany({
    data: brandData.map((brand, index) => {
      return {
        id: index+1,
        name: brand,
      };
    }),
  });
}

async function seedModels() {
  await Promise.all(
    [...new Array(totalModel)].map(async (_, index) => {
      const name =
        faker.vehicle.model() +
        ' ' +
        faker.vehicle.color() +
        ' ' +
        faker.vehicle.type() +
        index;
      await prisma.models.create({
        data: {
          name,
          brand_id: faker.number.int({ min: 1, max: brandData.length - 1 }),
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });
    })
  );
}

async function seedTransaction() {
  await Promise.all(
    [...new Array(totalTransactions)].map(async (_, index) => {
      await prisma.transactions.create({
        data: {
          model_id: faker.number.int({ min: 1, max: totalModel - 1 }),
          transaction_number: faker.finance.accountNumber(10) + index,
          status: Object.values(TransactionStatus)[
            faker.number.int({
              min: 0,
              max: Object.values(TransactionStatus).length - 1,
            })
          ] as TransactionStatus,
          created_at: faker.date.betweens({
            from: '2023-01-01T00:00:00.000Z',
            to: '2023-12-30T00:00:00.000Z',
          })[0],
          updated_at: new Date(),
        },
      });
    })
  );
}

(async () => {
  try {
    await seedMain();
    await seedModels();
    await seedTransaction();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
