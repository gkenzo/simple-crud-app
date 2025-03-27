import { User } from '../entities';

export abstract class UserRepository {
  create: (user: User) => Promise<User>;
  list: () => Promise<User[] | undefined>;
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
  update: (user: User) => Promise<User>;
  delete: (id: string) => Promise<void>;
}
