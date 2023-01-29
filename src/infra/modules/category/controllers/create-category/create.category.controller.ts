import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BusinessError } from 'src/domain/errors/business-error';
import { ICreateCategoryUseCase } from 'src/domain/usecases/category/create-category';
import { JwtAuthGuard } from 'src/infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { CREATE_CATEGORY_USE_CASE } from '../../category.providers';
import { CreateCategoryDto } from './dtos/create.category.dto';

@Controller('categories')
export class CreateCategoryController {
  constructor(
    @Inject(CREATE_CATEGORY_USE_CASE)
    private readonly createCategoryUseCase: ICreateCategoryUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(@Body() createCategoryDto: CreateCategoryDto, @Req() request) {
    try {
      const category = await this.createCategoryUseCase.execute({
        name: createCategoryDto.name,
        userId: request.user.sub,
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
