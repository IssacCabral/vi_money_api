import {
  BadRequestException,
  Controller,
  Delete,
  Inject,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BusinessError } from 'src/domain/errors/business-error';
import { IDeleteCategoryUseCase } from 'src/domain/usecases/category/delete-category';
import { JwtAuthGuard } from 'src/infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { DELETE_CATEGORY_USE_CASE } from '../../category.providers';
import { DeleteCategoryDto } from './dtos/delete.category.dto';

@Controller('categories')
export class DeleteCategoryController {
  constructor(
    @Inject(DELETE_CATEGORY_USE_CASE)
    private readonly deleteCategoryUseCase: IDeleteCategoryUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:categoryId')
  async handle(@Param() deleteCategoryDto: DeleteCategoryDto, @Req() request) {
    try {
      const { categoryId } = deleteCategoryDto;
      const { sub } = request.user;

      await this.deleteCategoryUseCase.execute(categoryId, sub);
    } catch (error) {
      console.log(error);
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
