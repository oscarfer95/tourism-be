import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AttractionsController } from './controllers/attractions.controller';
import { AttractionsService } from './services/attractions.service';
import { Attraction, AttractionSchema } from './entities/attraction.entity';

@Module({
  imports: [ MongooseModule.forFeature([
    {
      name: Attraction.name,
      schema: AttractionSchema
    }
  ])],
  controllers: [AttractionsController],
  providers: [AttractionsService]
})
export class AttractionsModule {}
