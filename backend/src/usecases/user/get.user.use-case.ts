import { Injectable, Logger } from '@nestjs/common';

import { isEmpty } from 'radash';
import { UserRepository } from '../../domain/repos/';

export interface GetUserOutputDTO {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

@Injectable()
export class GetUserUseCase {
  private readonly logger = new Logger(GetUserUseCase.name, {
    timestamp: true,
  });
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<GetUserOutputDTO> {
    const user = await this.userRepository.findById(id);

    if (!user || isEmpty(user)) {
      this.logger.error({
        topic: 'Get user',
        message: `User ${id} does not exists`,
      });
      throw new Error('Unable to find user with informed id');
    }

    this.logger.log({
      topic: 'Get user',
      message: `Retrieving user ${id}`,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
