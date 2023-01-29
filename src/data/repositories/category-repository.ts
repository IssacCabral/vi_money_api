import { ICategory } from 'src/domain/entities/category';
import { CreateCategoryParams } from 'src/domain/types/category-params';

export interface ICategoryRepository {
  createCategory(category: CreateCategoryParams): Promise<ICategory>;
}
