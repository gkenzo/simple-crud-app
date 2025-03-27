import { UserRepository } from 'src/domain/repos';

import { DeleteUserUseCase } from './delete.user.use-case';
import { UserInMemoryRepository } from '../../infra/db/inmemory/user';
import { setup } from './test.utils';
describe('[Use Cases] - [Delete User]', () => {
  let sut: DeleteUserUseCase;
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserInMemoryRepository();
    sut = new DeleteUserUseCase(repo);
  });

  it('Should be able to delete existing user', async () => {
    const { id } = await setup.user(repo);

    await sut.execute(id);

    expect(await repo.list()).toEqual([]);
  });

  it('Should not be able to delete unexisting user', async () => {
    await expect(sut.execute('')).rejects.toThrow();
  });
});
