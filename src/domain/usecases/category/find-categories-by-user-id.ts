import { ICategory } from 'src/domain/entities/category';
import {
  PaginationData,
  PaginationParams,
} from 'src/domain/types/pagination-params';

export interface IFindCategoriesByUserIdUseCase {
  execute(
    pagination: PaginationParams,
    userId: string,
  ): Promise<PaginationData<ICategory>>;
}
