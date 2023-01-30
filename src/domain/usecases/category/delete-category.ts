export interface IDeleteCategoryUseCase {
  execute(categoryId: string, userId: string): Promise<void>;
}
