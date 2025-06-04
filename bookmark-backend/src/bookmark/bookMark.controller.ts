import { Body, Controller, Post } from '@nestjs/common';
import { BookMarkService } from './bookMark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetUser } from 'src/auth/decorator';

@Controller('bookmark')
export class BookMarkController {
  constructor(private bookmarkService: BookMarkService) {}

  @Post('create')
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.create(userId, dto);
  }
}
