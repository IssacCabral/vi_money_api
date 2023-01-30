import { ITransaction } from 'src/domain/entities/transaction';
import {
  PaginationData,
  PaginationParams,
} from 'src/domain/types/pagination-params';
import { CreateTransactionParams } from 'src/domain/types/transaction-params';

export interface ITransactionRepository {
  createTransaction(
    transaction: CreateTransactionParams,
  ): Promise<ITransaction>;
  findTransactionsByUserId(
    pagination: PaginationParams,
    userId: string,
  ): Promise<PaginationData<ITransaction>>;
  findTransactionByid(trnascationId: string): Promise<ITransaction | null>;
  deleteTransaction(transactionId: string): Promise<void>;
}
