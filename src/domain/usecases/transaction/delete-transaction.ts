export interface IDeleteTransactionUseCase {
  execute(transactionId: string, userId: string): Promise<void>;
}
