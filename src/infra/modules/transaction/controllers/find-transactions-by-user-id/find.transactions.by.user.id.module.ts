import { Module } from '@nestjs/common';
import { DbFindTransactionsByUserIdUseCase } from 'src/data/usecases/transaction/db-find-transactions-by-user-id';
import { FIND_TRANSACTIONS_BY_USER_ID_USE_CASE } from '../../transaction.providers';
import { FindTransactionsByUserIdController } from './find.transactions.by.user.id.controller';
import { DbFindTransactionsByUserIdUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbFindTransactionsByUserIdUseCaseModule],
  controllers: [FindTransactionsByUserIdController],
  providers: [
    {
      provide: FIND_TRANSACTIONS_BY_USER_ID_USE_CASE,
      useClass: DbFindTransactionsByUserIdUseCase,
    },
  ],
})
export class FindTransactionsByUserIdModule {}
