import { user as PrismaUser, Prisma } from '@prisma/client';
import { User } from 'src/domain/entities';

export class UserPrismaMapper {
  static toEntity(user: PrismaUser): User {
    return User.create({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  static toPrisma(user: User): Prisma.userUncheckedCreateInput {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      updatedAt: new Date(),
    };
  }
}
