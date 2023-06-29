import { Module } from '@nestjs/common';
import { FoodsController } from './controllers/foods.controller';
import { FoodsService } from './services/foods.service';

@Module({
  controllers: [FoodsController],
  providers: [FoodsService]
})
export class FoodsModule {}
