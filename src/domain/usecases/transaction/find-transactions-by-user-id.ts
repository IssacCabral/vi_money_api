import { ITransaction } from 'src/domain/entities/transaction';
import { PaginationData } from 'src/domain/types/pagination-params';

export interface IFindTransactionsByUserIdUseCase {
  execute(userId: string): Promise<PaginationData<ITransaction>>;
}
