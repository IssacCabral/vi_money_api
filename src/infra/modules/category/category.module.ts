import { Module } from '@nestjs/common';
import { CreateCategoryModule } from './controllers/create-category/create.category.module';
import { FindCategoriesByUserIdModule } from './controllers/find-categories-by-user-id/find.categories.by.user.id.module';

@Module({
  imports: [CreateCategoryModule, FindCategoriesByUserIdModule],
})
export class CategoryModule {}
