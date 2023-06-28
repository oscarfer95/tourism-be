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
  private list: Attraction[];
  public filter = {
    available: true
  };
  public sortOptions = {
    order: 1
  };

  constructor(@Inject('MONGO') private _database: Db) {
    this.collection = this._database.collection('attractions');
  }

  async findAll(limit?: number, offset?: number): Promise<Attraction[]> {
   this.list = await this.collection.find(this.filter).sort(this.sortOptions).toArray();
    if (limit && offset && this.list) {
      return this.list.slice(offset, offset + limit);
    } else if (limit) {
      return this.list.slice(0, limit);
    };
    return this.list;
  }

  async findByCategory(value: any, limit?: number, offset?: number): Promise<Attraction[]> {
    const attributeFilter = {
      categories: { $in: value }
    };
    this.list = await this.collection.find(attributeFilter).sort(this.sortOptions).toArray();
     if (limit && offset && this.list) {
       return this.list.slice(offset, offset + limit);
     } else if (limit) {
       return this.list.slice(0, limit);
     };
     return this.list;
   }

  async findOne(id: string): Promise<Attraction> {
    const attraction = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!attraction) {
      throw new NotFoundException('Document not found');
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
      throw new NotFoundException('Document not created');
    }
  }

  async update(id: string, payload: UpdateAttractionDto) {
    let result = null;
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: payload
    };
    try {
      result = await this.collection.updateOne(filter, update);
    } catch (error) {
      throw new NotFoundException('Error updating document');
    }
    return result;
  }

  async delete(id: string) {
    let result = null;
    const filter = { _id: new ObjectId(id) };
    try {
      result = await this.collection.deleteOne(filter);
    } catch (error) {
      throw new NotFoundException('Error deleting document');
    }
    return result;
  }
}
