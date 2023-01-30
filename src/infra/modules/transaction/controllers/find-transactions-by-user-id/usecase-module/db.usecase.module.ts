import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PrismaTransactionRepository } from 'src/infra/database/prisma/repositories/prisma.transaction.repository';
import { TRANSACTION_REPOSITORY } from '../../../transaction.providers';

const providers: Provider[] = [
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
export class DbFindTransactionsByUserIdUseCaseModule {}
