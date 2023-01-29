import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/data/repositories/category-repository';
import { ICategory } from 'src/domain/entities/category';
import { CreateCategoryParams } from 'src/domain/types/category-params';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(category: CreateCategoryParams): Promise<ICategory> {
    const createdCategory = await this.prismaService.category.create({
      data: {
        name: category.name,
        userId: category.userId,
      },
    });

    return createdCategory;
  }

  async findUserCategoryByName(
    userId: string,
    categoryName: string,
  ): Promise<ICategory> {
    return await this.prismaService.category.findFirst({
      where: {
        userId,
        AND: {
          name: categoryName,
        },
      },
    });
  }

  async findCategoryById(id: string): Promise<ICategory> {
    return await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
  }
}
