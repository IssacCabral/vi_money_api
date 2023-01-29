import { ICategoryRepository } from 'src/data/repositories/category-repository';
import { ICategory } from 'src/domain/entities/category';
import { CreateCategoryParams } from 'src/domain/types/category-params';
import { PrismaService } from '../prisma.service';

export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(category: CreateCategoryParams): Promise<ICategory> {
    const createdCategory = await this.prismaService.category.create({
      data: category,
    });

    return createdCategory;
  }
}
