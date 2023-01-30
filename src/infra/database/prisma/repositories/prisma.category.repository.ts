import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from 'src/data/repositories/category-repository';
import { ICategory } from 'src/domain/entities/category';
import { CreateCategoryParams } from 'src/domain/types/category-params';
import {
  PaginationParams,
  PaginationData,
} from 'src/domain/types/pagination-params';
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

  async findCategoriesByUserId(
    pagination: PaginationParams,
    userId: string,
  ): Promise<PaginationData<ICategory>> {
    const data = await this.prismaService.category.findMany({
      where: {
        userId,
      },
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });

    const total = await this.prismaService.category.count({
      where: {
        userId,
      },
    });

    return {
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        hasNext: total > pagination.page * pagination.limit,
      },
      data: data as ICategory[],
    };
  }
}
