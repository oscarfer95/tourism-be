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

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Restaurant name'})
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Restaurant description'})
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Restaurant main image'})
  readonly coverUrl: string;

  @IsArray()
  @ApiProperty({description: 'Restaurant string array categories ids'})
  readonly categories: string[];

  @IsArray()
  @ApiProperty({description: 'Restaurant string array foods ids'})
  readonly foods: string[];

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({description: 'Restaurant featured boolean'})
  readonly isFeatured: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({description: 'Restaurant status'})
  readonly available: boolean;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({description: 'Restaurant location object'})
  readonly location: Location;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({description: 'Restaurant contact object'})
  readonly contact: Contact;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: 'Restaurant order priority'})
  readonly order: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: 'Restaurant rating 1 -5'})
  readonly rating: number;
}

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) { }
