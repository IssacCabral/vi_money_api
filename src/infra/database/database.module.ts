import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCategoryRepository } from './prisma/repositories/prisma.category.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma.user.repository';

@Module({
  providers: [PrismaService, PrismaUserRepository, PrismaCategoryRepository],
  exports: [PrismaService, PrismaUserRepository, PrismaCategoryRepository],
})
export class DatabaseModule {}
