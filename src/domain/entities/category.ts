import IBaseEntity from './base-entity';
import { IUser } from './user';

export interface ICategory extends IBaseEntity {
  name: string;
  userId: string;
  user?: IUser;
}
