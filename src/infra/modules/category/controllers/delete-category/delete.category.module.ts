import { Module } from '@nestjs/common';
import { DbDeleteCategoryUseCase } from 'src/data/usecases/category/db-delete-category';
import { DELETE_CATEGORY_USE_CASE } from '../../category.providers';
import { DeleteCategoryController } from './delete.category.controller';
import { DbDeleteCategoryUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbDeleteCategoryUseCaseModule],
  controllers: [DeleteCategoryController],
  providers: [
    {
      provide: DELETE_CATEGORY_USE_CASE,
      useClass: DbDeleteCategoryUseCase,
    },
  ],
})
export class DeleteCategoryModule {}
