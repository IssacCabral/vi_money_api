import { ICategoryRepository } from 'src/data/repositories/category-repository';
import { IUserRepository } from 'src/data/repositories/user-repository';
import { BusinessError } from 'src/domain/errors/business-error';
import {
  CreateCategoryParams,
  CreateCategoryReturns,
} from 'src/domain/types/category-params';
import { ICreateCategoryUseCase } from 'src/domain/usecases/category/create-category';

export class DbCreateCategory implements ICreateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute(params: CreateCategoryParams): Promise<CreateCategoryReturns> {
    const userExists = await this.userRepository.findUserById(params.userId);

    if (!userExists) {
      throw new BusinessError('User is not found', 404);
    }

    const category = await this.categoryRepository.createCategory(params);

    return {
      category,
    };
  }
}
