import { UserRepository } from 'src/domain/repos';
import { UpdateUserUseCase } from './update.user.use-case';
import { UserInMemoryRepository } from '../../infra/db/inmemory/user';
import { setup } from './test.utils';

describe('[Use Cases] - [Update User]', () => {
  let sut: UpdateUserUseCase;
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserInMemoryRepository();
    sut = new UpdateUserUseCase(repo);
  });

  it("Should be able to update user's data", async () => {
    const { id } = await setup.user(repo);
    const newEmail = 'email@emaill.com';
    await sut.execute({ id, email: newEmail });

    expect((await repo.findById(id))?.email).toBe(newEmail);
  });

  it('Should not be able to update user that does not exists', async () => {
    await expect(sut.execute({ id: '' })).rejects.toThrow();
  });
});
