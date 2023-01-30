import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from 'src/data/repositories/transaction-repository';
import { ITransaction } from 'src/domain/entities/transaction';
import {
  PaginationData,
  PaginationParams,
} from 'src/domain/types/pagination-params';
import { CreateTransactionParams } from 'src/domain/types/transaction-params';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaTransactionRepository implements ITransactionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createTransaction(
    transaction: CreateTransactionParams,
  ): Promise<ITransaction> {
    const createdTransaction = await this.prismaService.transaction.create({
      data: {
        ...transaction,
      },
    });

    return createdTransaction as ITransaction;
  }

  async findTransactionsByUserId(
    pagination: PaginationParams,
    userId: string,
  ): Promise<PaginationData<ITransaction>> {
    const data = await this.prismaService.transaction.findMany({
      where: {
        userId,
      },
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
    });

    const total = await this.prismaService.transaction.count({
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
      data: data as ITransaction[],
    };
  }
}
