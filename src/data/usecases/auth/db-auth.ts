import { Inject } from '@nestjs/common';
import { IHash } from 'src/data/protocols/hash';
import { IJwt } from 'src/data/protocols/jwt';
import { IUserRepository } from 'src/data/repositories/user-repository';
import { IUser } from 'src/domain/entities/user';
import { BusinessError } from 'src/domain/errors/business-error';
import { AuthParams, AuthResult } from 'src/domain/types/auth-params';
import { IAuthUseCase } from 'src/domain/usecases/auth/auth';
import { JWT_SERVICE } from 'src/infra/modules/auth/auth.providers';
import {
  HASH_SERVICE,
  USER_REPOSITORY,
} from 'src/infra/modules/user/user.providers';

export class DbAuthUseCase implements IAuthUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE)
    private readonly hashService: IHash,
    @Inject(JWT_SERVICE)
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
      user: this.mapUserJSON(user),
    };
  }

  private mapUserJSON(user: IUser) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
