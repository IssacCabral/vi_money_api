import { Module } from '@nestjs/common';
import { DbDeleteTransactionUseCase } from 'src/data/usecases/transaction/db-delete-transaction';
import { DELETE_TRANSACTION_USE_CASE } from '../../transaction.providers';
import { DeleteTransactionController } from './delete.transaction.controller';
import { DbDeleteTransactionUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbDeleteTransactionUseCaseModule],
  controllers: [DeleteTransactionController],
  providers: [
    {
      provide: DELETE_TRANSACTION_USE_CASE,
      useClass: DbDeleteTransactionUseCase,
    },
  ],
})
export class DeleteTransactionModule {}
