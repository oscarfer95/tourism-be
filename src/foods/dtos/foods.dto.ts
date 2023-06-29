import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString
} from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Food name'})
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Food description'})
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Food main image'})
  readonly coverUrl: string;

  @IsArray()
  @ApiProperty({description: 'Food string array categories ids'})
  readonly ingredients: string[];

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({description: 'Food featured boolean'})
  readonly isFeatured: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({description: 'Food status'})
  readonly available: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: 'Food order priority'})
  readonly order: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: 'Food rating 1 -5'})
  readonly rating: number;
}

export class UpdateFoodDto extends PartialType(CreateFoodDto) { }
