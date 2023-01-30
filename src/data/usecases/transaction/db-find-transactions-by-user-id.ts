import { Inject } from '@nestjs/common';
import { ITransactionRepository } from 'src/data/repositories/transaction-repository';
import { ITransaction } from 'src/domain/entities/transaction';
import {
  PaginationData,
  PaginationParams,
} from 'src/domain/types/pagination-params';
import { IFindTransactionsByUserIdUseCase } from 'src/domain/usecases/transaction/find-transactions-by-user-id';
import { TRANSACTION_REPOSITORY } from 'src/infra/modules/transaction/transaction.providers';

export class DbFindTransactionsByUserIdUseCase
  implements IFindTransactionsByUserIdUseCase
{
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionsRepository: ITransactionRepository,
  ) {}

  async execute(
    pagination: PaginationParams,
    userId: string,
  ): Promise<PaginationData<ITransaction>> {
    const transactions =
      await this.transactionsRepository.findTransactionsByUserId(
        pagination,
        userId,
      );

    return transactions;
  }
}
