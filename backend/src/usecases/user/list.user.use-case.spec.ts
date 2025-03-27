import { UserRepository } from 'src/domain/repos';
import { ListUserUseCase } from './list.user.use-case';
import { UserInMemoryRepository } from '../../infra/db/inmemory/user';
import { setup } from './test.utils';

describe('[Use Cases] - [List User]', () => {
  let sut: ListUserUseCase;
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserInMemoryRepository();
    sut = new ListUserUseCase(repo);
  });

  it('Should list the correct amount of users', async () => {
    await setup.user(repo);
    await setup.user(repo);
    await setup.user(repo);

    expect(await sut.execute()).toHaveLength(3);
  });
});
