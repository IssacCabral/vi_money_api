import { Module } from '@nestjs/common';
import { CreateCategoryModule } from './controllers/create-category/create.category.module';

@Module({
  imports: [CreateCategoryModule],
})
export class CategoryModule {}
