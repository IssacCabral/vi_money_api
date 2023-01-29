import { ICategoryRepository } from 'src/data/repositories/category-repository';
import { ITransactionRepository } from 'src/data/repositories/transaction-repository';
import { IUserRepository } from 'src/data/repositories/user-repository';
import { BusinessError } from 'src/domain/errors/business-error';
import {
  CreateTransactionParams,
  CreateTransactionReturns,
} from 'src/domain/types/transaction-params';
import { ICreateTransactionUseCase } from 'src/domain/usecases/transaction/create-transaction';

export class DbCreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async execute(
    params: CreateTransactionParams,
  ): Promise<CreateTransactionReturns> {
    const categoryExists = await this.categoryRepository.findCategoryById(
      params.categoryId,
    );

    if (!categoryExists) {
      throw new BusinessError('Category is not found', 404);
    }

    if (categoryExists.userId !== params.userId) {
      throw new BusinessError('Invalid category');
    }

    const transaction = await this.transactionRepository.createTransaction(
      params,
    );

    return {
      transaction,
    };
  }
}
