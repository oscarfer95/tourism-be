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
import {
  CreateAttractionDto,
  UpdateAttractionDto,
} from 'src/attractions/dtos/attractions.dto';
import { AttractionsService } from 'src/attractions/services/attractions.service';

@ApiTags('Attractions')
@Controller('attractions')
export class AttractionsController {
  constructor(private _attractionService: AttractionsService) {}

  @Get()
  @ApiOperation({ summary: 'List of attractions' })
  @HttpCode(HttpStatus.OK)
  async getAttractions(
    @Query('limit') limit: any,
    @Query('offset') offset: any,
  ) {
    const list = await this._attractionService.findAll(limit, offset);
    return {
      message: 'Attraction list',
      payload: list,
    };
  }

  @Get()
  @ApiOperation({ summary: 'List of featured attractions' })
  @HttpCode(HttpStatus.OK)
  async getFeaturedAttractions() {
    const list = await this._attractionService.findAllFeatured();
    return {
      message: 'Attraction featured list',
      payload: list,
    };
  }

  @Post('category')
  @ApiOperation({ summary: 'List of attractions by category' })
  @HttpCode(HttpStatus.OK)
  async getAttractionsByCategory(
    @Body() categories: any,
    @Query('limit') limit: any,
    @Query('offset') offset: any,
  ) {
    const list = await this._attractionService.findByCategory(
      categories.data,
      limit,
      offset,
    );
    return {
      message: 'Attraction list by category',
      payload: list,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get attraction by id' })
  @HttpCode(HttpStatus.OK)
  async getAttraction(@Param('id') id: string) {
    const document = await this._attractionService.findOne(id);
    return {
      message: 'Attraction founded',
      payload: document,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create new attraction' })
  @HttpCode(HttpStatus.CREATED)
  createAttraction(@Body() payload: CreateAttractionDto) {
    const newDocument = this._attractionService.create(payload);
    return {
      message: 'Attraction created',
      payload: newDocument,
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
