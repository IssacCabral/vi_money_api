import IBaseEntity from './base-entity';
import { ICategory } from './category';
import { ITransaction } from './transaction';

export interface IUser extends IBaseEntity {
  email: string;
  password: string;
  username: string;
  categories?: ICategory[];
  transactions?: ITransaction[];
}
