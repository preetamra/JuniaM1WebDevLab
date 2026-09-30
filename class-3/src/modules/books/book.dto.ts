import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @Min(1500)
  @Max(2025)
  publishedYear: number;

  @IsObject() // @ValidateNested() alone lets a missing author through
  @ValidateNested()
  @Type(() => CreateAuthorDto)
  author: CreateAuthorDto;
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsInt()
  @Min(1500)
  @Max(2025)
  publishedYear?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAuthorDto)
  author?: CreateAuthorDto;
}
