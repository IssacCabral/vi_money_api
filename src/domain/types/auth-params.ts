import { IUser } from '../entities/user';

export type AuthParams = {
  email: string;
  password: string;
};

export type AuthResult = {
  token: string;
  user: Partial<IUser>;
};
