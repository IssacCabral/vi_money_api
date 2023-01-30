import { Module } from '@nestjs/common';
import { CreateTransactionModule } from './controllers/create-transaction/create.transaction.module';
import { FindTransactionsByUserIdModule } from './controllers/find-transactions-by-user-id/find.transactions.by.user.id.module';

@Module({
  imports: [CreateTransactionModule, FindTransactionsByUserIdModule],
})
export class TransactionModule {}
