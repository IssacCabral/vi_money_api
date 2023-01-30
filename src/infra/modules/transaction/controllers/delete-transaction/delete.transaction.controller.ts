import {
  BadRequestException,
  Controller,
  Delete,
  Inject,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BusinessError } from 'src/domain/errors/business-error';
import { IDeleteTransactionUseCase } from 'src/domain/usecases/transaction/delete-transaction';
import { JwtAuthGuard } from 'src/infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { DELETE_TRANSACTION_USE_CASE } from '../../transaction.providers';
import { DeleteTransactionDto } from './dtos/delete.transaction.dto';

@Controller('transactions')
export class DeleteTransactionController {
  constructor(
    @Inject(DELETE_TRANSACTION_USE_CASE)
    private readonly deleteTransactionUseCase: IDeleteTransactionUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:transactionId')
  async handle(
    @Param() deleteTransactionDto: DeleteTransactionDto,
    @Req() request,
  ) {
    try {
      const { transactionId } = deleteTransactionDto;
      const { sub } = request.user;

      await this.deleteTransactionUseCase.execute(transactionId, sub);
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
