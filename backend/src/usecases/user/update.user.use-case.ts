import { Injectable } from '@nestjs/common';

import { isEmpty } from 'radash';
import { UserRepository } from '../../domain/repos/';

export interface UpdateInputDTO {
  id: string;
  name?: string;
  email?: string;
}

export interface UpdateUserOutputDTO {
  id: string;
  email: string;
  name: string;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(dto: UpdateInputDTO): Promise<UpdateUserOutputDTO> {
    const user = await this.userRepository.findById(dto.id);

    if (!user || isEmpty(user))
      throw new Error('Unable to find user with informed id');

    if (dto?.name) user.name = dto.name;
    if (dto?.email) user.email = dto.email;

    const output = await this.userRepository.update(user);

    return {
      id: output.id,
      email: output.email,
      name: output.name,
    };
  }
}
