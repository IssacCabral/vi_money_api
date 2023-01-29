import { ICategoryRepository } from 'src/data/repositories/category-repository';
import { IUserRepository } from 'src/data/repositories/user-repository';
import { ICategory } from 'src/domain/entities/category';
import { CreateCategoryParams } from 'src/domain/types/category-params';
import { ICreateCategoryUseCase } from 'src/domain/usecases/category/create-category';

export class DbCreateCategory implements ICreateCategoryUseCase {
  constructor(
    private categoryRepository: ICategoryRepository,
    private userRepository: IUserRepository,
  ) {}

  execute(params: CreateCategoryParams): Promise<ICategory> {
    throw new Error('Method not implemented.');
  }
}
