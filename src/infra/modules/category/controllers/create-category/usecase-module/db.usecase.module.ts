import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaCategoryRepository } from 'src/infra/database/prisma/repositories/prisma.category.repository';
import { PrismaUserRepository } from 'src/infra/database/prisma/repositories/prisma.user.repository';
import { USER_REPOSITORY } from 'src/infra/modules/user/user.providers';
import { CATEGORY_REPOSITORY } from '../../../category.providers';

const providers: Provider[] = [
  {
    provide: CATEGORY_REPOSITORY,
    useClass: PrismaCategoryRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: PrismaUserRepository,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbCreateUserUseCaseModule {}
