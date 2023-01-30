import { Inject } from '@nestjs/common';
import { ITransactionRepository } from 'src/data/repositories/transaction-repository';
import { IDeleteTransactionUseCase } from 'src/domain/usecases/transaction/delete-transaction';
import { TRANSACTION_REPOSITORY } from 'src/infra/modules/transaction/transaction.providers';

export class DbDeleteTransactionUseCase implements IDeleteTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  execute(transactionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
