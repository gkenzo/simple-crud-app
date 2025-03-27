import { GetUserUseCase } from './get.user.use-case';
import { UserInMemoryRepository } from '../../infra/db/inmemory/user';
import { setup } from './test.utils';
import { UserRepository } from 'src/domain/repos';

describe('[Use Cases] - [Get User]', () => {
  let sut: GetUserUseCase;
  let repo: UserRepository;

  beforeEach(() => {
    repo = new UserInMemoryRepository();
    sut = new GetUserUseCase(repo);
  });

  it('Should be able to get existing user', async () => {
    const { id, dto } = await setup.user(repo);

    const result = await sut.execute(id);

    expect(result.id).toBe(id);
    expect(result.email).toBe(dto.email);
    expect(result.name).toBe(dto.name);
  });

  it('Should not be able to get unexisting user', async () => {
    await expect(sut.execute('')).rejects.toThrow();
  });
});
