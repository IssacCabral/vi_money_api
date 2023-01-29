import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TransactionType } from 'src/domain/entities/transaction';
import { BusinessError } from 'src/domain/errors/business-error';
import { ICreateTransactionUseCase } from 'src/domain/usecases/transaction/create-transaction';
import { JwtAuthGuard } from 'src/infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { CREATE_TRANSACTION_USE_CASE } from '../../transaction.providers';
import { CreateTransactionDto } from './dtos/create.transaction.dto';

@Controller('transactions')
export class CreateTransactionController {
  constructor(
    @Inject(CREATE_TRANSACTION_USE_CASE)
    private readonly createTransactionUseCase: ICreateTransactionUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(
    @Body() createTransactionDto: CreateTransactionDto,
    @Req() request,
  ) {
    try {
      const { categoryId, amount, title, type } = createTransactionDto;
      const { sub } = request.user;

      const transaction = await this.createTransactionUseCase.execute({
        userId: sub,
        categoryId,
        amount,
        title,
        type: TransactionType[type],
      });

      return transaction;
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessError) {
        throw new BadRequestException(error.message, {
          cause: error,
          description: error.name,
        });
      }
      throw new BadRequestException(error);
    }
  }
}
