import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
  IsString
} from 'class-validator';
import { Location } from '../entities/location.entity';
import { Contact } from '../entities/contact.entity';

export class CreateAttractionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Attraction name'})
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Attraction description'})
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Attraction main image'})
  readonly coverUrl: string;

  @IsArray()
  @ApiProperty({description: 'Attraction string array categories ids'})
  readonly categories: string[];

  @IsArray()
  @ApiProperty({description: 'Attraction string array foods ids'})
  readonly foods: string[];

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({description: 'Attraction featured boolean'})
  readonly isFeatured: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({description: 'Attraction status'})
  readonly available: boolean;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({description: 'Attraction location object'})
  readonly location: Location;
  
  @IsObject()
  @IsNotEmpty()
  @ApiProperty({description: 'Attraction contact object'})
  readonly contact: Contact;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: 'Attraction order priority'})
  readonly order: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: 'Attraction rating 1 -5'})
  readonly rating: number;
}

export class UpdateAttractionDto extends PartialType(CreateAttractionDto) { }
