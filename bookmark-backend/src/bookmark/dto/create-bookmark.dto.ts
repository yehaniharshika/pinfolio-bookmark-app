import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description?: string;

  @IsUrl()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty({ message: 'Bookmark image URL is required' })
  bookmarkImg: string;
}
