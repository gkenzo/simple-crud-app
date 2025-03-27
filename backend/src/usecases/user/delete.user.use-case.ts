import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../domain/repos/';

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name, {
    timestamp: true,
  });
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
      this.logger.log({ topic: 'Delete user', message: { success: true } });
    } catch (e) {
      this.logger.error({ topic: 'Delete user', message: e.message });
    }
  }
}
