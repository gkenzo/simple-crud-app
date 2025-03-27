/* eslint-disable @typescript-eslint/no-floating-promises */
import { PrismaClient } from '@prisma/client';
import { generateMockUsers } from './mock/users';

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.user.createMany({
      data: generateMockUsers(20),
    });
  } catch (err) {
    console.log(`error while seeding: ${err.message}`);
  }
}

seed()
  .then(() => console.log('Seeding completed!'))
  .finally(() => {
    prisma.$disconnect();
  });
