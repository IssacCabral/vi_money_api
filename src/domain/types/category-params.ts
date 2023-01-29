import { ICategory } from '../entities/category';

export type CreateCategoryParams = Omit<
  ICategory,
  'id' | 'createdAt' | 'updatedAt'
>;
export type CreateCategoryReturns = {
  category: ICategory;
};
