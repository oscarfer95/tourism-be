import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateAttractionDto,
  UpdateAttractionDto,
} from 'src/attractions/dtos/attractions.dtos';
import { Attraction } from 'src/attractions/entities/attraction.entity';

@Injectable()
export class AttractionsService {

  constructor() {
  }

  private attractions: Attraction[] = [
    {
      id: '1',
      name: 'Torre Eiffel',
      description:
        'La Torre Eiffel es una emblemática estructura de hierro situada en París. Es uno de los monumentos más reconocidos en el mundo y un importante atractivo turístico de la ciudad.',
      coverUrl: 'https://example.com/images/torre-eiffel.jpg',
      rating: 4.5,
      mainCategories: [],
      categories: [],
      foods: [],
      isFeatured: true,
      available: true,
      location: {
        address: '',
        coords: {
          lat: '',
          lng: ''
        }
      },
      contact: {
        link: '',
        mail: '',
        phone: ''
      },
      order: 10
    }
  ];

  findAll(limit?: number, offset?: number) {
    if (limit && offset) {
      return this.attractions.slice(offset, offset + limit);
    } else if (limit) {
      return this.attractions.slice(0, limit);
    }
    return this.attractions;
  }

  findOne(id: string) {
    const attraction = this.attractions.find(
      (item: Attraction) => item.id === id,
    );
    if (!attraction) {
      throw new NotFoundException('Attraction not found');
    }
    return attraction;
  }

  create(payload: CreateAttractionDto) {
    const newAttraction = {
      id: 'id',
      ...payload,
    };
    this.attractions.push(newAttraction);
    return newAttraction;
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
