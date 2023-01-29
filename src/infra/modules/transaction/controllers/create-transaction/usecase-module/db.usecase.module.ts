import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaCategoryRepository } from 'src/infra/database/prisma/repositories/prisma.category.repository';
import { PrismaTransactionRepository } from 'src/infra/database/prisma/repositories/prisma.transaction.repository';
import { CATEGORY_REPOSITORY } from 'src/infra/modules/category/category.providers';
import { TRANSACTION_REPOSITORY } from '../../../transaction.providers';

const providers: Provider[] = [
  {
    provide: CATEGORY_REPOSITORY,
    useClass: PrismaCategoryRepository,
  },
  {
    provide: TRANSACTION_REPOSITORY,
    useClass: PrismaTransactionRepository,
  },
];

@Module({
  imports: [DatabaseModule],
  providers: [...providers],
  exports: [...providers],
})
export class DbCreateTransactionUseCaseModule {}
