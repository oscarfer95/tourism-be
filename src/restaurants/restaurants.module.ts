import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurants.controller';
import { RestaurantsService } from './services/restaurants.service';

@Module({
  controllers: [RestaurantController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}
