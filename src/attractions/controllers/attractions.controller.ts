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
  HttpCode
} from '@nestjs/common';
import {
  CreateAttractionDto,
  UpdateAttractionDto,
} from 'src/attractions/dtos/attractions.dtos';
import { AttractionsService } from 'src/attractions/services/attractions.service';

@Controller('attractions')
export class AttractionsController {
  constructor(private _attractionService: AttractionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAttractions(@Query('limit') limit, @Query('offset') offset) {
    const list = this._attractionService.findAll(limit, offset);
    
    return {
      message: 'Attraction list',
      payload: list,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getAttraction(@Param('id') id: string) {
    const attraction = this._attractionService.findOne(id);
    return {
      message: 'Attraction founded',
      payload: attraction,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createAttraction(@Body() payload: CreateAttractionDto) {
    const newAttraction = this._attractionService.create(payload);
    return {
      message: 'Attraction created',
      payload: newAttraction,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateAttraction(
    @Param('id') id: string,
    @Body() updatedAttraction: UpdateAttractionDto,
  ) {
    const index = this._attractionService.update(id, updatedAttraction);
    return {
      message: 'Attraction updated ',
      payload: index,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  deleteAttraction(@Param('id') id: string) {
    return this._attractionService.delete(id);
  }
}
