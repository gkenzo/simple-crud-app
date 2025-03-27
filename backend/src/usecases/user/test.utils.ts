import { UserRepository } from 'src/domain/repos';
import { faker } from '@faker-js/faker';

import { CreateUserInputDTO, CreateUserUseCase } from './create.user.use-case';

const setupUser = async (repo: UserRepository) => {
  const dto: CreateUserInputDTO = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
  };
  const createUserUseCase = new CreateUserUseCase(repo);
  const { id } = await createUserUseCase.execute(dto);
  return { id, dto };
};

export const setup = {
  user: setupUser,
};
