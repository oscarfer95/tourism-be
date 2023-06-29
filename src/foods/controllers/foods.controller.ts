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
import { FoodsService } from '../services/foods.service';
import { CreateFoodDto, UpdateFoodDto } from '../dtos/foods.dto';

@ApiTags('Foods')
@Controller('foods')
export class FoodsController {
  constructor(private _foodService: FoodsService) {}

  @Get()
  @ApiOperation({ summary: 'List of foods' })
  @HttpCode(HttpStatus.OK)
  async getFoods(
    @Query('limit') limit: any,
    @Query('offset') offset: any,
  ) {
    const list = await this._foodService.findAll(limit, offset);
    return {
      message: 'Food list',
      payload: list,
    };
  }

  @Get()
  @ApiOperation({ summary: 'List of featured foods' })
  @HttpCode(HttpStatus.OK)
  async getFeaturedFoods() {
    const list = await this._foodService.findAllFeatured();
    return {
      message: 'Food featured list',
      payload: list,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant by id' })
  @HttpCode(HttpStatus.OK)
  async getFood(@Param('id') id: string) {
    const document = await this._foodService.findOne(id);
    return {
      message: 'Food founded',
      payload: document,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new food' })
  @HttpCode(HttpStatus.CREATED)
  createFood(@Body() payload: CreateFoodDto) {
    const newDocument = this._foodService.create(payload);
    return {
      message: 'Food created',
      payload: newDocument,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update food' })
  @HttpCode(HttpStatus.OK)
  updateFood(
    @Param('id') id: string,
    @Body() updatedFood: UpdateFoodDto,
  ) {
    const index = this._foodService.update(id, updatedFood);
    return {
      message: 'Food updated',
      payload: index,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete food by id' })
  @HttpCode(HttpStatus.OK)
  deleteFood(@Param('id') id: string) {
    return this._foodService.delete(id);
  }
}
