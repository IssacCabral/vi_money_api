import { Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/data/repositories/category-repository';
import { BusinessError } from 'src/domain/errors/business-error';
import {
  CreateCategoryParams,
  CreateCategoryReturns,
} from 'src/domain/types/category-params';
import { ICreateCategoryUseCase } from 'src/domain/usecases/category/create-category';
import { CATEGORY_REPOSITORY } from 'src/infra/modules/category/category.providers';

export class DbCreateCategoryUseCase implements ICreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute(params: CreateCategoryParams): Promise<CreateCategoryReturns> {
    const userCategoryAlreadyExists =
      await this.categoryRepository.findUserCategoryByName(
        params.userId,
        params.name,
      );

    if (userCategoryAlreadyExists) {
      throw new BusinessError('This user is already owns this category');
    }

    const category = await this.categoryRepository.createCategory(params);

    return {
      category,
    };
  }
}
