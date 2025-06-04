import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookMarkDto } from './dto/update-bookmark.dto';

@Injectable()
export class BookMarkService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateBookmarkDto) {
    try {
      const bookmark = await this.prisma.bookMark.create({
        data: {
          title: dto.title,
          description: dto.description,
          link: dto.link,
          bookmarkImg: dto.bookmarkImg,
          userId: userId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          link: true,
          bookmarkImg: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: 'Bookmark created successfully ✅',
        data: bookmark,
      };
    } catch (error) {
      console.error('Create Bookmark Error:', error);
      throw new InternalServerErrorException('Failed to create bookmark');
    }
  }

  async update(bookmarkId: number, userId: number, dto: UpdateBookMarkDto) {
    try {
      // Find the bookmark by id and userId to ensure ownership
      const existingBookmark = await this.prisma.bookMark.findFirst({
        where: {
          id: bookmarkId,
          userId: userId,
        },
      });

      if (!existingBookmark) {
        throw new BadRequestException(
          'Bookmark not found or you do not have permission to update it',
        );
      }

      // Update bookmark with provided fields
      const updatedBookmark = await this.prisma.bookMark.update({
        where: { id: bookmarkId },
        data: {
          title: dto.title ?? existingBookmark.title,
          description: dto.description ?? existingBookmark.description,
          link: dto.link ?? existingBookmark.link,
          bookmarkImg: dto.bookmarkImg ?? existingBookmark.bookmarkImg,
        },
        select: {
          id: true,
          title: true,
          description: true,
          link: true,
          bookmarkImg: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: 'Bookmark updated successfully ✅',
        data: updatedBookmark,
      };
    } catch (error) {
      console.error('Update Bookmark Error:', error);
      throw new InternalServerErrorException('Failed to update bookmark');
    }
  }

  async delete(bookmarkId: number, userId: number) {
    try {
      const bookmark = await this.prisma.bookMark.findFirst({
        where: {
          id: bookmarkId,
          userId: userId,
        },
      });

      if (!bookmark) {
        throw new NotFoundException(
          'Bookmark not found or you do not have permission to delete it',
        );
      }

      await this.prisma.bookMark.delete({
        where: { id: bookmarkId },
      });

      return {
        message: 'Bookmark deleted successfully ✅',
      };
    } catch (error) {
      console.error('Delete Bookmark Error:', error);
      throw new InternalServerErrorException('Failed to delete bookmark');
    }
  }

  async getAll(userId: number) {
    try {
      const bookmarks = await this.prisma.bookMark.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          description: true,
          link: true,
          bookmarkImg: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: 'Bookmarks fetched successfully 📚',
        data: bookmarks,
      };
    } catch (error) {
      console.error('Get All Bookmarks Error:', error);
      throw new InternalServerErrorException('Failed to fetch bookmarks');
    }
  }
}
