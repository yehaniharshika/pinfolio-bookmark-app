// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserNModule } from './user/user.model'; // should probably be user.module.ts
import { Service } from './.service'; // double check if this is correct
import { UserController } from './user/user.controller';
import { BookMarkModule } from './bookmark/bookMark.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Optional: makes ConfigService globally available
    }),
    PrismaModule,
    AuthModule,
    UserNModule,
    BookMarkModule,
  ],
  controllers: [UserController],
  providers: [Service],
})
export class AppModule {}
