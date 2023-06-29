import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Food } from '../entities/food.entity';
import { CreateFoodDto, UpdateFoodDto } from '../dtos/foods.dto';

@Injectable()
export class FoodsService {
  private collection: any;
  public filter = {
    available: true,
  };
  public sortOptions = {
    order: 1,
  };

  constructor(@Inject('MONGO') private _database: Db) {
    this.collection = this._database.collection('foods');
  }

  async findAll(limit?: number, offset?: number): Promise<Food[]> {
    const list = await this.collection
      .find(this.filter)
      .sort(this.sortOptions)
      .toArray();
    if (limit && offset && list) {
      return list.slice(offset, offset + limit);
    } else if (limit) {
      return list.slice(0, limit);
    }
    return list;
  }

  async findAllFeatured(): Promise<Food[]> {
    const featuredFilter = {
      available: true,
      isFeatured: true,
    };

    const list = await this.collection
      .find(featuredFilter)
      .sort(this.sortOptions)
      .toArray();
    return list;
  }

  async findOne(id: string): Promise<Food> {
    const item = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!item) {
      throw new NotFoundException('Document not found');
    }
    return item;
  }

  async create(payload: CreateFoodDto) {
    const newDocument = {
      ...payload,
    };

    try {
      await this.collection.insertOne(newDocument);
      return newDocument;
    } catch (error) {
      throw new NotFoundException('Document not created');
    }
  }

  async update(id: string, payload: UpdateFoodDto) {
    let result = null;
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: payload,
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
