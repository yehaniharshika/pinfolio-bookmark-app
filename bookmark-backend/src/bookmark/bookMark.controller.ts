import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BookMarkService } from './bookMark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { GetUser } from 'src/auth/decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtGuard } from 'src/auth/guard';

@Controller('bookmark')
@UseGuards(JwtGuard)
export class BookMarkController {
  constructor(private bookmarkService: BookMarkService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('bookmarkImg', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `bookmark-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      console.log('UserID:', userId); // for debugging

      if (!userId) {
        throw new BadRequestException('User ID is required');
      }

      if (!file) {
        throw new BadRequestException('Bookmark image is required');
      }

      dto.bookmarkImg = file.filename;

      const result = await this.bookmarkService.create(userId, dto);
      return result;
    } catch (error) {
      console.error('Create Bookmark Error (Controller):', error);
      throw new InternalServerErrorException(
        'Something went wrong while creating the bookmark',
      );
    }
  }

  @Put('update/:id')
  @UseInterceptors(
    FileInterceptor('bookmarkImg', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `bookmark-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async updateBookmark(
    @Param('id') bookmarkId: string,
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      console.log('User ID:', userId, 'Bookmark ID:', bookmarkId);

      if (!userId) {
        throw new BadRequestException('User ID is required');
      }

      if (!bookmarkId) {
        throw new BadRequestException('Bookmark ID is required');
      }

      // Optional file upload check
      if (file) {
        dto.bookmarkImg = file.filename;
      }

      //  convert that string into a number
      const result = await this.bookmarkService.update(
        +bookmarkId,
        userId,
        dto,
      );
      return result;
    } catch (error) {
      console.error('Update Bookmark Error (Controller):', error);
      throw new InternalServerErrorException(
        'Something went wrong while updating the bookmark',
      );
    }
  }

  @Delete('delete/:id')
  async deleteBookmark(
    @Param('id') bookmarkId: string,
    @GetUser('id') userId: number,
  ) {
    try {
      return await this.bookmarkService.delete(+bookmarkId, userId);
    } catch (error) {
      console.error('Delete Bookmark Error (Controller):', error);
      throw new InternalServerErrorException(
        'Something went wrong while deleting the bookmark',
      );
    }
  }
}
