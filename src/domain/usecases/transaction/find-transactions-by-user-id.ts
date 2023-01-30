import { ITransaction } from 'src/domain/entities/transaction';
import {
  PaginationData,
  PaginationParams,
} from 'src/domain/types/pagination-params';

export interface IFindTransactionsByUserIdUseCase {
  execute(
    pagination: PaginationParams,
    userId: string,
  ): Promise<PaginationData<ITransaction>>;
}
