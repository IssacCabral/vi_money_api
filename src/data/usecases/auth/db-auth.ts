import { IHash } from 'src/data/protocols/hash';
import { IJwt } from 'src/data/protocols/jwt';
import { IUserRepository } from 'src/data/repositories/user-repository';
import { BusinessError } from 'src/domain/errors/business-error';
import { AuthParams, AuthResult } from 'src/domain/types/auth-params';
import { IAuthUseCase } from 'src/domain/usecases/auth/auth';

export class DbAuthUseCase implements IAuthUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHash,
    private readonly jwtService: IJwt,
  ) {}

  async execute(params: AuthParams): Promise<AuthResult> {
    const user = await this.userRepository.findUserByEmail(params.email);

    if (!user) {
      throw new BusinessError('Invalid credentials', 401);
    }

    const isValidPassword = await this.hashService.compareHash(
      params.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BusinessError('Invalid credentials', 401);
    }

    const token = await this.jwtService.sign({
      id: user.id,
      email: user.email,
    });

    return {
      token,
      user,
    };
  }
}
