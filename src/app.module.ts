import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'
import { AttractionsModule } from './attractions/attractions.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from 'enviroments';
import { DatabaseModule } from './database.module';
import { CategoriesModule } from './categories/categories.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { FoodsModule } from './foods/foods.module';
import config from './config';

@Module({
  imports: [
    AttractionsModule,
    RestaurantsModule,
    FoodsModule,
    CategoriesModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        port: Joi.string().required(),
        feUrl: Joi.string().required(),
        corsOrigins: Joi.string().required()
      })
    })],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule { }
