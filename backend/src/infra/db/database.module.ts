import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserPrismaRepository } from './prisma/user';
import { UserRepository } from 'src/domain/repos';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
})
export class DatabaseModule {}
