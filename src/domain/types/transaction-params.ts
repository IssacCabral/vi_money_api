import { ITransaction } from '../entities/transaction';

export type CreateTransactionParams = Omit<
  ITransaction,
  'id' | 'createdAt' | 'updatedAt'
>;
export type CreateTransactionReturns = {
  transaction: ITransaction;
};
