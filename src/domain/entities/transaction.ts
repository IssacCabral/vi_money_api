import IBaseEntity from './base-entity';

export enum TransactionType {
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT',
}

export interface ITransaction extends IBaseEntity {
  userId: string;
  categoryId: string;
  title: string;
  type: TransactionType;
  amount: number;
}
