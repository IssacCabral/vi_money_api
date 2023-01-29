import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from 'src/data/repositories/transaction-repository';
import { ITransaction } from 'src/domain/entities/transaction';
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
}
