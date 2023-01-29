import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
} from '@nestjs/common';
import { BusinessError } from 'src/domain/errors/business-error';
import { ICreateCategoryUseCase } from 'src/domain/usecases/category/create-category';
import { CREATE_CATEGORY_USE_CASE } from '../../category.providers';
import { CreateCategoryDto } from './dtos/create.category.dto';

@Controller('categories')
export class CreateUserController {
  constructor(
    @Inject(CREATE_CATEGORY_USE_CASE)
    private readonly createCategoryUseCase: ICreateCategoryUseCase,
  ) {}

  @Post()
  async handle(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.createCategoryUseCase.execute({
        name: createCategoryDto.name,
        userId: '1',
      });
      return category;
    } catch (error) {
      console.log(error);
      if (error instanceof BusinessError) {
        throw new HttpException(error.message, error.statusCode);
      }
      throw new BadRequestException(error);
    }
  }
}
