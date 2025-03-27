import { Module } from '@nestjs/common';
import { DatabaseModule } from '../db/database.module';
import { UserController } from './controllers/user.controller';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserUseCase,
  ListUserUseCase,
  UpdateUserUseCase,
} from 'src/usecases/user';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserUseCase,
    ListUserUseCase,
    UpdateUserUseCase,
  ],
})
export class HttpModule {}
