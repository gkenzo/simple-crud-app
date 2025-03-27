import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { User } from '../../domain/entities/index';
import { UserRepository } from '../../domain/repos/';

export interface CreateUserInputDTO {
  name: string;
  email: string;
}

export interface CreateUserOutputDTO {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name, {
    timestamp: true,
  });

  constructor(private readonly userRepository: UserRepository) {}

  toJson(user: User): CreateUserOutputDTO {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async execute(dto: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const exists = await this.userRepository.findByEmail(dto.email);
    if (exists) {
      this.logger.error({ topic: 'user-create', message: 'Duplicated email' });
      throw new Error('An error occurred while creating this user');
    }
    const user = await this.userRepository.create(
      User.create({
        id: randomUUID(),
        name: dto.name,
        email: dto.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );

    this.logger.log({ topic: 'user-create', message: user });

    return this.toJson(user);
  }
}
