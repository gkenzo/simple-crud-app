import { User } from 'src/domain/entities';
import { UserRepository } from 'src/domain/repos';
import { prisma } from '../client';
import { UserPrismaMapper } from './user.prisma.mapper';
import { isEmpty } from 'radash';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  create = async (data: User): Promise<User> => {
    const user = await prisma.user.create({
      data: UserPrismaMapper.toPrisma(data),
    });

    return UserPrismaMapper.toEntity(user);
  };
  list = async (): Promise<User[] | undefined> => {
    const rawData = await prisma.user.findMany({
      orderBy: { updatedAt: 'desc' },
    });

    if (!rawData || isEmpty(rawData)) return;

    return rawData.map((entry) => UserPrismaMapper.toEntity(entry));
  };
  findById = async (id: string): Promise<User | undefined> => {
    const rawData = await prisma.user.findFirst({ where: { id } });

    if (!rawData || isEmpty(rawData)) return;

    return UserPrismaMapper.toEntity({
      id: rawData.id,
      name: rawData.name,
      email: rawData.email,
      createdAt: rawData.createdAt,
      updatedAt: rawData.updatedAt,
    });
  };
  findByEmail = async (email: string): Promise<User | undefined> => {
    const rawData = await prisma.user.findFirst({ where: { email } });

    if (!rawData || isEmpty(rawData)) return;

    return UserPrismaMapper.toEntity({
      id: rawData.id,
      name: rawData.name,
      email: rawData.email,
      createdAt: rawData.createdAt,
      updatedAt: rawData.updatedAt,
    });
  };
  update = async (user: User): Promise<User> => {
    const rawData = await prisma.user.update({
      where: { id: user.id },
      data: UserPrismaMapper.toPrisma(user),
    });

    return UserPrismaMapper.toEntity({
      id: rawData.id,
      name: rawData.name,
      email: rawData.email,
      createdAt: rawData.createdAt,
      updatedAt: rawData.updatedAt,
    });
  };
  delete = async (id: string): Promise<void> => {
    await prisma.user.delete({ where: { id } });
  };
}
