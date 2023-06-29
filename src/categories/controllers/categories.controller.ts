import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Delete,
  Body,
  Post,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private _categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'List of categories' })
  @HttpCode(HttpStatus.OK)
  async getCategories() {
    const list = await this._categoryService.findAll();
    return {
      message: 'Category list',
      payload: list,
    };
  }

  @Get('collection/:collection')
  @ApiOperation({ summary: 'List of categories by collection' })
  @HttpCode(HttpStatus.OK)
  async getCategoriesByCollection(
    @Param('collection') collection: string
  ) {
    const list = await this._categoryService.findByCollection(
      collection
    );
    return {
      message: 'Category list by collection',
      payload: list,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by id' })
  @HttpCode(HttpStatus.OK)
  async getCategory(@Param('id') id: string) {
    const document = await this._categoryService.findOne(id);
    return {
      message: 'Category founded',
      payload: document,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new category' })
  @HttpCode(HttpStatus.CREATED)
  createCategory(@Body() payload: CreateCategoryDto) {
    const newDocument = this._categoryService.create(payload);
    return {
      message: 'Category created',
      payload: newDocument,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update category' })
  @HttpCode(HttpStatus.OK)
  updateCategory(
    @Param('id') id: string,
    @Body() updatedCategory: UpdateCategoryDto,
  ) {
    const index = this._categoryService.update(id, updatedCategory);
    return {
      message: 'Category updated',
      payload: index,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category by id' })
  @HttpCode(HttpStatus.OK)
  deleteCategory(@Param('id') id: string) {
    return this._categoryService.delete(id);
  }
}
