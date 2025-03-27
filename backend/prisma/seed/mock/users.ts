import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

export function generateMockUsers(quantity: number) {
  const mockUsers: Prisma.userCreateManyInput[] = [];

  for (let i = 0; i <= quantity; i++) {
    mockUsers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });
  }
  return mockUsers;
}
