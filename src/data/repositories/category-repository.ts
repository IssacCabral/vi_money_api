import { ICategory } from 'src/domain/entities/category';
import { CreateCategoryParams } from 'src/domain/types/category-params';
import {
  PaginationData,
  PaginationParams,
} from 'src/domain/types/pagination-params';

export interface ICategoryRepository {
  createCategory(category: CreateCategoryParams): Promise<ICategory>;
  findUserCategoryByName(
    userId: string,
    categoryName: string,
  ): Promise<ICategory | null>;
  findCategoryById(id: string): Promise<ICategory | null>;
  findCategoriesByUserId(
    pagination: PaginationParams,
    userId: string,
  ): Promise<PaginationData<ICategory>>;
}
