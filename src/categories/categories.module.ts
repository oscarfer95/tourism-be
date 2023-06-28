import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/categories.controller';
import { CategoryService } from './services/category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoriesModule {}
