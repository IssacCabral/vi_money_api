import { Module } from '@nestjs/common';
import { DbCreateTransactionUseCase } from 'src/data/usecases/transaction/db-create-transaction';
import { CREATE_TRANSACTION_USE_CASE } from '../../transaction.providers';
import { CreateTransactionController } from './create.transaction.controller';
import { DbCreateTransactionUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbCreateTransactionUseCaseModule],
  controllers: [CreateTransactionController],
  providers: [
    {
      provide: CREATE_TRANSACTION_USE_CASE,
      useClass: DbCreateTransactionUseCase,
    },
  ],
})
export class CreateTransactionModule {}
