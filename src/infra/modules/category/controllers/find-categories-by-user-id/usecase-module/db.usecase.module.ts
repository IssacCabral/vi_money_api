import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaCategoryRepository } from 'src/infra/database/prisma/repositories/prisma.category.repository';
import { CATEGORY_REPOSITORY } from '../../../category.providers';

const providers: Provider[] = [
  {
    provide: CATEGORY_REPOSITORY,
    useClass: PrismaCategoryRepository,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbFindCategoriesByUserIdUseCaseModule {}
