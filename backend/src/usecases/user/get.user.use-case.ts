import { Injectable } from '@nestjs/common';

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
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<GetUserOutputDTO> {
    const user = await this.userRepository.findById(id);

    if (!user || isEmpty(user)) {
      throw new Error('Unable to find user with informed id');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }
}
