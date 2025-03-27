import { User } from '../../../../domain/entities';
import { UserRepository } from '../../../../domain/repos/';

export class UserInMemoryRepository implements UserRepository {
  users: User[] = [];
  create = async (user: User): Promise<User> => {
    this.users.push(user);

    return Promise.resolve(user);
  };
  list = async (): Promise<User[]> => {
    return Promise.resolve(this.users);
  };
  findById = async (id: string): Promise<User | undefined> => {
    const user = this.users.find((user) => user.id === id);

    return Promise.resolve(user);
  };
  findByEmail = async (email: string): Promise<User | undefined> => {
    const user = this.users.find((user) => user.email === email);

    return Promise.resolve(user);
  };
  update = async (user: User): Promise<User> => {
    const idx = this.users.findIndex((u) => u.id === user.id);
    if (idx < 0) throw new Error(`Unable to find user with id ${user.id}`);

    this.users[idx] = user;

    return Promise.resolve(user);
  };
  delete = async (id: string): Promise<void> => {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx < 0) throw new Error(`Unable to find user with id ${id}`);

    this.users.splice(idx, 1);

    return Promise.resolve();
  };
}
