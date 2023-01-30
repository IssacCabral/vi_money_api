import { Module } from '@nestjs/common';
import { DbFindCategoriesByUserIdUseCase } from 'src/data/usecases/category/db-find-categories-by-user-id';
import { FIND_CATEGORIES_BY_USER_ID_USE_CASE } from '../../category.providers';
import { FindCategoriesByUserIdController } from './find.categories.by.user.id.controller';
import { DbFindCategoriesByUserIdUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbFindCategoriesByUserIdUseCaseModule],
  controllers: [FindCategoriesByUserIdController],
  providers: [
    {
      provide: FIND_CATEGORIES_BY_USER_ID_USE_CASE,
      useClass: DbFindCategoriesByUserIdUseCase,
    },
  ],
})
export class FindCategoriesByUserIdModule {}
