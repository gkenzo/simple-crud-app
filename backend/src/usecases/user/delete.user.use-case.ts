import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repos/';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
