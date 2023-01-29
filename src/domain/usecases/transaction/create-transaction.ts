import {
  CreateTransactionParams,
  CreateTransactionReturns,
} from 'src/domain/types/transaction-params';

export interface ICreateTransactionUseCase {
  execute(params: CreateTransactionParams): Promise<CreateTransactionReturns>;
}
