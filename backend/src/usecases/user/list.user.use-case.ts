import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repos/';
import { User } from '../../domain/entities/';

export type ListUserOutputDTO = Promise<
  { id: string; name: string; email: string }[] | undefined
>;

@Injectable()
export class ListUserUseCase {
  private readonly logger = new Logger(ListUserUseCase.name, {
    timestamp: true,
  });
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
      this.logger.debug({ topic: 'list-user', message: 'There is no users' });
      return [];
    }

    this.logger.log({ topic: 'list-user', message: 'Listing users' });
    return this.toJson(users);
  }
}
