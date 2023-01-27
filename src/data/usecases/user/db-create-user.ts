import { Inject } from '@nestjs/common';
import { IHash } from 'src/data/protocols/hash';
import { IUserRepository } from 'src/data/repositories/user-repository';
import { BusinessError } from 'src/domain/errors/business-error';
import {
  CreateUserParams,
  CreateUserReturns,
} from 'src/domain/types/user-params';
import { ICreateUserUseCase } from 'src/domain/usecases/user/create-user';
import {
  HASH_SERVICE,
  USER_REPOSITORY,
} from 'src/infra/modules/user/user.providers';

export class DbCreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE)
    private readonly hashService: IHash,
  ) {}

  async execute(params: CreateUserParams): Promise<CreateUserReturns> {
    const emailAlreadyExists = await this.userRepository.findUserByEmail(
      params.email,
    );

    if (emailAlreadyExists) {
      throw new BusinessError('Email already exists');
    }

    const usernameAlreadyExists = await this.userRepository.findUserByUsername(
      params.username,
    );

    if (usernameAlreadyExists) {
      throw new BusinessError('Username already exists');
    }

    const hashedPassword = await this.hashService.generateHash(params.password);

    const user = await this.userRepository.createUser({
      ...params,
      password: hashedPassword,
    });

    return {
      user: Object.assign({}, user, { password: undefined }),
    };
  }
}
