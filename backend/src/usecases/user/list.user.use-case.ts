import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repos/';
import { User } from '../../domain/entities/';

export type ListUserOutputDTO = Promise<
  { id: string; name: string; email: string }[] | undefined
>;

@Injectable()
export class ListUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  toJson(users: User[]) {
    return users?.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
  }

  async execute(): Promise<ListUserOutputDTO> {
    const users = await this.userRepository.list();

    if (!users) {
      return [];
    }

    return this.toJson(users);
  }
}
