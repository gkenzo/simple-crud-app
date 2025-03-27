import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetUserOutputDTO,
  GetUserUseCase,
  ListUserUseCase,
  UpdateUserUseCase,
} from 'src/usecases/user';
import {
  CreateUserRequest,
  UpdateUserRequest,
} from '../dtos/user.controller.dtos';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly listUserUseCase: ListUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async create(@Body() input: CreateUserRequest) {
    const user = await this.createUserUseCase.execute(input);
    const key = `user_${user.id}`;
    await this.cacheManager.set(key, user);

    return { user, ok: true };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(id);
    const key = `user_${id}`;
    this.cacheManager.del(key);

    return { ok: true };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const key = `user_${id}`;
    let user = (await this.cacheManager.get(key)) as GetUserOutputDTO;
    if (!user) {
      user = await this.getUserUseCase.execute(id);
      await this.cacheManager.set(key, user);
    }

    return user;
  }

  @Get()
  async list() {
    return this.listUserUseCase.execute();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() input: UpdateUserRequest) {
    const user = await this.updateUserUseCase.execute({ ...input, id });
    const key = `user_${id}`;
    await this.cacheManager.del(key);

    return { user, ok: true };
  }
}
