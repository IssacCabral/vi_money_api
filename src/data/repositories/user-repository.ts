import { IUser } from 'src/domain/entities/user';
import { CreateUserParams } from 'src/domain/types/user-params';

export interface IUserRepository {
  createUser(user: CreateUserParams): Promise<IUser>;
  findUserById(id: string): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserByUsername(username: string): Promise<IUser | null>;
}
