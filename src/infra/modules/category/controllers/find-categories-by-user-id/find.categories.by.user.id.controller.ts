import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IFindCategoriesByUserIdUseCase } from 'src/domain/usecases/category/find-categories-by-user-id';
import { JwtAuthGuard } from 'src/infra/modules/auth/controllers/authentication/guards/jwt-auth.guard';
import { FIND_CATEGORIES_BY_USER_ID_USE_CASE } from '../../category.providers';
import { FindCategoriesByUserIdDto } from './dtos/find.categories.by.user.id.dto';

@Controller('categories')
export class FindCategoriesByUserIdController {
  constructor(
    @Inject(FIND_CATEGORIES_BY_USER_ID_USE_CASE)
    private readonly findCategoriesByUserIdUseCase: IFindCategoriesByUserIdUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async handle(
    @Query() findCategoriesByUserIdDto: FindCategoriesByUserIdDto,
    @Req() request,
  ) {
    try {
      const { page, limit } = findCategoriesByUserIdDto;
      const { sub } = request.user;

      const categories = await this.findCategoriesByUserIdUseCase.execute(
        {
          page: Number(page),
          limit: Number(limit),
        },
        sub,
      );
      return categories;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
