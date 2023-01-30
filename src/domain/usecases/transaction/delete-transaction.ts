export interface IDeleteTransactionUseCase {
  execute(transactionId: string): Promise<void>;
}
