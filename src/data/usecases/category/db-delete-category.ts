import { Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/data/repositories/category-repository';
import { BusinessError } from 'src/domain/errors/business-error';
import { IDeleteCategoryUseCase } from 'src/domain/usecases/category/delete-category';
import { CATEGORY_REPOSITORY } from 'src/infra/modules/category/category.providers';

export class DbDeleteCategoryUseCase implements IDeleteCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(categoryId: string, userId: string): Promise<void> {
    const categoryExists = await this.categoryRepository.findCategoryById(
      categoryId,
    );

    if (!categoryExists) {
      throw new BusinessError('Category is not found', 404);
    }

    if (categoryExists.userId !== userId) {
      throw new BusinessError('Invalid Category');
    }

    await this.categoryRepository.deleteCategory(categoryId);
  }
}
