import { UserRepository } from 'src/domain/repos';
import { faker } from '@faker-js/faker';

import { CreateUserInputDTO, CreateUserUseCase } from './create.user.use-case';
import { UserInMemoryRepository } from '../../infra/db/inmemory/user';
import { setup } from './test.utils';

describe('[Use Cases] - [Create User]', () => {
  let sut: CreateUserUseCase;
  let repo: UserRepository;
  beforeEach(() => {
    repo = new UserInMemoryRepository();
    sut = new CreateUserUseCase(repo);
  });
  it('should be able to create a new user', async () => {
    const dto: CreateUserInputDTO = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    };

    const result = await sut.execute(dto);

    expect(result).toBeTruthy();
    expect(result.id).toBeTruthy();
  });
  it('should not be able to create a user without valid props', async () => {
    const dto = {} as CreateUserInputDTO;

    await expect(sut.execute(dto)).rejects.toThrow();
  });
  it('should not be able to create a user with email taken', async () => {
    const { dto } = await setup.user(repo);
    await expect(sut.execute(dto)).rejects.toThrow();
  });
});
