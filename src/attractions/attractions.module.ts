import { Module } from '@nestjs/common';
import { AttractionsController } from './controllers/attractions.controller';
import { AttractionsService } from './services/attractions.service';

@Module({
  controllers: [AttractionsController],
  providers: [AttractionsService]
})
export class AttractionsModule {}
