import { AuthParams, AuthResult } from 'src/domain/types/auth-params';

export interface IAuthUseCase {
  execute(params: AuthParams): Promise<AuthResult>;
}
