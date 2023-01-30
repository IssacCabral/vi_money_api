import { Module } from '@nestjs/common';
import { CreateTransactionModule } from './controllers/create-transaction/create.transaction.module';
import { DeleteTransactionModule } from './controllers/delete-transaction/delete.transaction.module';
import { FindTransactionsByUserIdModule } from './controllers/find-transactions-by-user-id/find.transactions.by.user.id.module';

@Module({
  imports: [
    CreateTransactionModule,
    FindTransactionsByUserIdModule,
    DeleteTransactionModule,
  ],
})
export class TransactionModule {}
