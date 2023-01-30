import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteTransactionDto {
  @IsNotEmpty()
  @IsUUID()
  transactionId: string;
}
