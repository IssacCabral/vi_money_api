import {
  CreateCategoryParams,
  CreateCategoryReturns,
} from 'src/domain/types/category-params';

export interface ICreateCategoryUseCase {
  execute(params: CreateCategoryParams): Promise<CreateCategoryReturns>;
}
