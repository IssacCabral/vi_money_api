import { Inject } from '@nestjs/common';
import { ITransactionRepository } from 'src/data/repositories/transaction-repository';
import { BusinessError } from 'src/domain/errors/business-error';
import { IDeleteTransactionUseCase } from 'src/domain/usecases/transaction/delete-transaction';
import { TRANSACTION_REPOSITORY } from 'src/infra/modules/transaction/transaction.providers';

export class DbDeleteTransactionUseCase implements IDeleteTransactionUseCase {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(transactionId: string, userId: string): Promise<void> {
    const transcationExists =
      await this.transactionRepository.findTransactionByid(transactionId);

    if (!transcationExists) {
      throw new BusinessError('Transaction is not found', 404);
    }

    if (transcationExists.userId !== userId) {
      throw new BusinessError('Invalid Transaction');
    }

    await this.transactionRepository.deleteTransaction(transactionId);
  }
}
