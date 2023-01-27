import { IHash } from 'src/data/protocols/hash';
import { IUserRepository } from 'src/data/repositories/user-repository';
import { BusinessError } from 'src/domain/errors/business-error';
import {
  CreateUserParams,
  CreateUserReturns,
} from 'src/domain/types/user-params';
import { ICreateUserUseCase } from 'src/domain/usecases/user/create-user';

export class DbCreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
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
