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
import { RestaurantsService } from '../services/restaurants.service';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../dtos/restaurants.dto';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private _restaurantService: RestaurantsService) { }

  @Get()
  @ApiOperation({ summary: 'List of restaurants' })
  @HttpCode(HttpStatus.OK)
  async getAttractions(
    @Query('limit') limit: any,
    @Query('offset') offset: any,
  ) {
    const list = await this._restaurantService.findAll(limit, offset);
    return {
      message: 'Restaurant list',
      payload: list,
    };
  }

  @Get()
  @ApiOperation({ summary: 'List of featured restaurants' })
  @HttpCode(HttpStatus.OK)
  async getFeaturedRestaurants() {
    const list = await this._restaurantService.findAllFeatured();
    return {
      message: 'Restaurant featured list',
      payload: list,
    };
  }

  @Post('food')
  @ApiOperation({ summary: 'List of restaurants by food' })
  @HttpCode(HttpStatus.OK)
  async getRestaurantsByFood(
    @Body() foods: any
  ) {
    const list = await this._restaurantService.findByFood(
      foods.data
    );
    return {
      message: 'Restaurant list by category',
      payload: list,
    };
  }

  @Post('category')
  @ApiOperation({ summary: 'List of restaurants by category' })
  @HttpCode(HttpStatus.OK)
  async getRestaurantsByCategory(
    @Body() categories: any,
    @Query('limit') limit: any,
    @Query('offset') offset: any,
  ) {
    const list = await this._restaurantService.findByCategory(
      categories.data,
      limit,
      offset,
    );
    return {
      message: 'Restaurant list by category',
      payload: list,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant by id' })
  @HttpCode(HttpStatus.OK)
  async getRestaurant(@Param('id') id: string) {
    const document = await this._restaurantService.findOne(id);
    return {
      message: 'Restaurant founded',
      payload: document,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new restaurant' })
  @HttpCode(HttpStatus.CREATED)
  createRestaurant(@Body() payload: CreateRestaurantDto) {
    const newDocument = this._restaurantService.create(payload);
    return {
      message: 'Restaurant created',
      payload: newDocument,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update restaurant' })
  @HttpCode(HttpStatus.OK)
  updateRestaurant(
    @Param('id') id: string,
    @Body() updatedRestaurant: UpdateRestaurantDto,
  ) {
    const index = this._restaurantService.update(id, updatedRestaurant);
    return {
      message: 'Restaurant updated',
      payload: index,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete restaurant by id' })
  @HttpCode(HttpStatus.OK)
  deleteRestaurant(@Param('id') id: string) {
    return this._restaurantService.delete(id);
  }
}
