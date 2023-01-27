import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Post,
} from '@nestjs/common';
import { BusinessError } from 'src/domain/errors/business-error';
import { ICreateUserUseCase } from 'src/domain/usecases/user/create-user';
import { CREATE_USER_USE_CASE } from '../../user.providers';
import { CreateUserDto } from './dtos/create.user.dto';

@Controller('users')
export class CreateUserController {
  constructor(
    @Inject(CREATE_USER_USE_CASE)
    private readonly createUserUseCase: ICreateUserUseCase,
  ) {}

  @Post()
  async handle(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.createUserUseCase.execute(createUserDto);
      return user;
    } catch (error) {
      if (error instanceof BusinessError) {
        throw new BadRequestException(error.message, {
          cause: error,
          description: error.name,
        });
      }
      throw new BadRequestException(error);
    }
  }
}
