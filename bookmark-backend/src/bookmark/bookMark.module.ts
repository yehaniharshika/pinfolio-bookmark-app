import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { BookMarkController } from './bookMark.controller';
import { BookMarkService } from './bookMark.service';

@Module({
  imports: [PrismaModule],
  controllers: [BookMarkController],
  providers: [BookMarkService],
})
export class BookMarkModule {

}
