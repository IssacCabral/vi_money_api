import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IFindTransactionsByUserIdUseCase } from 'src/domain/usecases/transaction/find-transactions-by-user-id';
import { JwtAuthGuard } from 'src/infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { FIND_TRANSACTIONS_BY_USER_ID_USE_CASE } from '../../transaction.providers';
import { FindTransactionsByUserIdDto } from './dtos/find-transactions.by.user.id.dto';

@Controller('transactions')
export class FindTransactionsByUserIdController {
  constructor(
    @Inject(FIND_TRANSACTIONS_BY_USER_ID_USE_CASE)
    private readonly findTransactionsByUserIdUseCase: IFindTransactionsByUserIdUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async handle(
    @Query() findTransactionsByUserIdDto: FindTransactionsByUserIdDto,
    @Req() request,
  ) {
    try {
      const { page, limit } = findTransactionsByUserIdDto;
      const { userId } = request.user;

      const transactions = await this.findTransactionsByUserIdUseCase.execute(
        {
          page: Number(page),
          limit: Number(limit),
        },
        userId,
      );
      return transactions;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
