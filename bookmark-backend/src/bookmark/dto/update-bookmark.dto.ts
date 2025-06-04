import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateBookMarkDto {
  
  @IsInt()
  id?: number;
  
  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Link must be a valid URL' })
  link?: string;

  @IsOptional()
  @IsString({ message: 'Bookmark image must be a string' })
  bookmarkImg?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
