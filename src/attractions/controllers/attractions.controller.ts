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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CreateAttractionDto,
  UpdateAttractionDto,
} from 'src/attractions/dtos/attractions.dto';
import { AttractionsService } from 'src/attractions/services/attractions.service';

@ApiTags('attractions')
@Controller('attractions')
export class AttractionsController {
  constructor(private _attractionService: AttractionsService) {}

  @Get()
  @ApiOperation({ summary: 'List of attractions' })
  @HttpCode(HttpStatus.OK)
  getAttractions(@Query('limit') limit: any, @Query('offset') offset: any) {
    const list = this._attractionService.findAll(limit, offset);
    
    return {
      message: 'Attraction list',
      payload: list,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get attraction by id' })
  @HttpCode(HttpStatus.OK)
  getAttraction(@Param('id') id: string) {
    const attraction = this._attractionService.findOne(id);
    return {
      message: 'Attraction founded',
      payload: attraction,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new attraction' })
  @HttpCode(HttpStatus.CREATED)
  createAttraction(@Body() payload: CreateAttractionDto) {
    const newAttraction = this._attractionService.create(payload);
    return {
      message: 'Attraction created',
      payload: newAttraction,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update attraction' })
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
  @ApiOperation({ summary: 'Delete attraction by id' })
  @HttpCode(HttpStatus.OK)
  deleteAttraction(@Param('id') id: string) {
    return this._attractionService.delete(id);
  }
}
