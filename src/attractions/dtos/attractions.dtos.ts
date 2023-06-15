import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { Location } from '../entities/location.entity';
import { Contact } from '../entities/contact.entity';

export class CreateAttractionDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly coverUrl: string;

  @IsArray()
  readonly mainCategories: string[];

  @IsArray()
  readonly categories: string[];

  @IsArray()
  readonly foods: string[];

  @IsBoolean()
  @IsNotEmpty()
  readonly isFeatured: boolean;

  @IsBoolean()
  @IsNotEmpty()
  readonly available: boolean;

  @IsObject()
  @IsNotEmpty()
  readonly location: Location;
  
  @IsObject()
  @IsNotEmpty()
  readonly contact: Contact;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly order: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly rating: number;
}

export class UpdateAttractionDto extends PartialType(CreateAttractionDto) { }
