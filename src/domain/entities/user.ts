import { IBaseEntity } from './base-entity';

export interface IUser extends IBaseEntity {
  email: string;
  password: string;
  username: string;
}
