import {
  CreateUserParams,
  CreateUserReturns,
} from 'src/domain/types/user-params';

export interface ICreateUserUseCase {
  execute(params: CreateUserParams): Promise<CreateUserReturns>;
}
