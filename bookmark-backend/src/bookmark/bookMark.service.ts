import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';

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
}
