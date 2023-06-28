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
    const list = await this.collection.find(this.filter).sort(this.sortOptions).toArray();
    if (limit && offset && list) {
      return list.slice(offset, offset + limit);
    } else if (limit) {
      return list.slice(0, limit);
    };
    return list;
  }

  async findAllFeatured(): Promise<Attraction[]> {
    const featuredFilter = {
      available: true,
      isFeatured: true
    };

    const list = await this.collection.find(featuredFilter).sort(this.sortOptions).toArray();
    return list;
  }

  async findByCategory(value: any, limit?: number, offset?: number): Promise<Attraction[]> {
    let list = [];

    if (value) {
      const attributeFilter = {
        categories: { $in: value }
      };

      list = await this.collection.find(attributeFilter).sort(this.sortOptions).toArray();
      if (limit && offset && list) {
        return list.slice(offset, offset + limit);
      } else if (limit) {
        return list.slice(0, limit);
      };
    } else {
      list = await this.findAll();
    }

     return list;
   }

  async findOne(id: string): Promise<Attraction> {
    const item = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!item) {
      throw new NotFoundException('Document not found');
    }
    return item;
  }

  async create(payload: CreateAttractionDto) {
    const newDocument = {
      ...payload
    };

    try {
      await this.collection.insertOne(newDocument);
      return newDocument;
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
