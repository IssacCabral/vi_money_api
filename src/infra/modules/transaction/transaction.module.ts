import { Module } from '@nestjs/common';
import { CreateTransactionModule } from './controllers/create-transaction/create.transaction.module';

@Module({
  imports: [CreateTransactionModule],
})
export class TransactionModule {}
