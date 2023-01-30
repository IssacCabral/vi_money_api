import { Inject } from '@nestjs/common';
import { ICategoryRepository } from 'src/data/repositories/category-repository';
import { ICategory } from 'src/domain/entities/category';
import {
  PaginationParams,
  PaginationData,
} from 'src/domain/types/pagination-params';
import { IFindCategoriesByUserIdUseCase } from 'src/domain/usecases/category/find-categories-by-user-id';
import { CATEGORY_REPOSITORY } from 'src/infra/modules/category/category.providers';

export class DbFindCategoriesByUserIdUseCase
  implements IFindCategoriesByUserIdUseCase
{
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoriesRepository: ICategoryRepository,
  ) {}

  async execute(
    pagination: PaginationParams,
    userId: string,
  ): Promise<PaginationData<ICategory>> {
    const categories = await this.categoriesRepository.findCategoriesByUserId(
      pagination,
      userId,
    );
    return categories;
  }
}
