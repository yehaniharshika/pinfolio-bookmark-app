import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BookMarkService } from './bookMark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetUser } from 'src/auth/decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('bookmark')
export class BookMarkController {
  constructor(private bookmarkService: BookMarkService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('bookmarkImg', {
      storage: diskStorage({
        destination: './uploads/bookmarks',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `bookmark-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    dto.bookmarkImg = file.filename;
    return this.bookmarkService.create(userId, dto);
  }
}
