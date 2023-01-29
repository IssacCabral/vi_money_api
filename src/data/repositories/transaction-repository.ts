import { ITransaction } from 'src/domain/entities/transaction';
import { CreateTransactionParams } from 'src/domain/types/transaction-params';

export interface ITransactionRepository {
  createTransaction(
    transaction: CreateTransactionParams,
  ): Promise<ITransaction>;
}
