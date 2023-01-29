import { ICategory } from 'src/domain/entities/category';
import { CreateCategoryParams } from 'src/domain/types/category-params';

export interface ICreateCategoryUseCase {
  execute(params: CreateCategoryParams): Promise<ICategory>;
}
