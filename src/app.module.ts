import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttractionsController } from './controllers/attractions.controller';
import { AttractionsService } from './services/attractions.service';

@Module({
  imports: [],
  controllers: [AppController, AttractionsController],
  providers: [AppService, AttractionsService],
})
export class AppModule {}
