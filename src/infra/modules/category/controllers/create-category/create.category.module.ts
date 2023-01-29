import { Module } from '@nestjs/common';
import { DbCreateCategoryUseCase } from 'src/data/usecases/category/db-create-category';
import { CREATE_CATEGORY_USE_CASE } from '../../category.providers';
import { CreateCategoryController } from './create.category.controller';
import { DbCreateCategoryUseCaseModule } from './usecase-module/db.usecase.module';

@Module({
  imports: [DbCreateCategoryUseCaseModule],
  controllers: [CreateCategoryController],
  providers: [
    {
      provide: CREATE_CATEGORY_USE_CASE,
      useClass: DbCreateCategoryUseCase,
    },
  ],
})
export class CreateCategoryModule {}
