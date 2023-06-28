import { PartialType, ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: 'Category name'})
  readonly name: string;

  @IsString()
  @ApiProperty({description: 'Category description'})
  readonly description: string;

  @IsString()
  @ApiProperty({description: 'Category image'})
  readonly coverUrl: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({description: 'Category status'})
  readonly available: boolean;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({description: 'Attraction order priority'})
  readonly order: number;

  @IsString()
  @ApiProperty({description: 'Category collection'})
  readonly collection: string;

  @IsString()
  @ApiProperty({description: 'Category icon'})
  readonly icon: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }
