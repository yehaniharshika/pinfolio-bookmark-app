import { IsNotEmpty, IsOptional, IsString, IsUrl, IsInt } from 'class-validator';

export class CreateBookmarkDto {
  @IsOptional() 
  @IsInt()
  id?: number;

  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUrl({}, { message: 'Link must be a valid URL' })
  @IsNotEmpty({ message: 'Link is required' })
  link: string;

  @IsString()
  @IsNotEmpty({ message: 'Bookmark image URL is required' })
  bookmarkImg: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  updatedAt?: Date;
}
