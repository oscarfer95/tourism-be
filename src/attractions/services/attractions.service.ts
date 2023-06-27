import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import {
  CreateAttractionDto,
  UpdateAttractionDto,
} from 'src/attractions/dtos/attractions.dto';
import { Attraction } from 'src/attractions/entities/attraction.entity';
import { Db, ObjectId } from 'mongodb';

@Injectable()
export class AttractionsService {

  private collection: any;
  private attractions: any;

  constructor(@Inject('MONGO') private _database: Db) {
    this.collection = this._database.collection('attractions');
    console.log(this.collection.find().toArray());
  }

  async findAll(limit?: number, offset?: number) {
   this.attractions = await this.collection.find().toArray();
    if (limit && offset && this.attractions) {
      return this.attractions.slice(offset, offset + limit);
    } else if (limit) {
      return this.attractions.slice(0, limit);
    };
    return this.attractions;
  }

  async findOne(id: string) {
    const attraction = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!attraction) {
      throw new NotFoundException('Attraction not found');
    }
    return attraction;
  }

  async create(payload: CreateAttractionDto) {
    const newAttraction = {
      ...payload
    };

    try {
      await this.collection.insertOne(newAttraction);
      return newAttraction;
    } catch (error) {
      throw new NotFoundException('Attraction not created');
    }
  }

  update(id: string, payload: UpdateAttractionDto) {
    const attraction = this.findOne(id);
    if (!attraction) {
      throw new NotFoundException('Attraction not found');
    }
    const index = this.attractions.findIndex(
      (attraction) => attraction.id === id,
    );
    this.attractions[index] = { ...attraction, ...payload };
    return this.attractions[index];
  }

  delete(id: string) {
    const index = this.attractions.findIndex(
      (attraction: Attraction) => attraction.id === id,
    );
    if (index === -1) {
      throw new NotFoundException('Attraction not found');
    }
    this.attractions.splice(index, 1);
    return true;
  }
}
