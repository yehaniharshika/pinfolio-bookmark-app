import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'generated/prisma';
import { use } from 'passport';
import { GetUser } from 'src/auth/decorator/';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';

@Controller('users')
export class UserController {
  //decorators
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log(email);
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.editUser(userId, dto);
  }
}
