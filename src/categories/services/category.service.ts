import { Injectable, NotFoundException, Inject } from '@nestjs/common';

import { Db, ObjectId } from 'mongodb';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService {

  private collection: any;
  private list: Category[];
  public filter = {
    available: true
  };
  public sortOptions = {
    order: 1
  };

  constructor(@Inject('MONGO') private _database: Db) {
    this.collection = this._database.collection('categories');
  }

  async findAll(): Promise<Category[]> {
    this.list = await this.collection.find(this.filter).sort(this.sortOptions).toArray();
    return this.list;
  }

  async findByCollection(value: any): Promise<Category[]> {
    const attributeFilter = {
      collection: value
    };
    
    this.list = await this.collection.find(attributeFilter).sort(this.sortOptions).toArray();
    return this.list;
  }

  async findOne(id: string): Promise<Category> {
    const item = await this.collection.findOne({ _id: new ObjectId(id) });
    if (!item) {
      throw new NotFoundException('Document not found');
    }
    return item;
  }

  async create(payload: CreateCategoryDto) {
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

  async update(id: string, payload: UpdateCategoryDto) {
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
