import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, BookMark } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { SignupDto } from './dto';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
import { ConfigService } from '@nestjs/config';

// npm i argon2 - It's possible to hash using either Argon2i, Argon2d or Argon2id (default), and verify if a password matches a hash.
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: SignupDto) {
    // 1. Generate the password hash
    const hash = await argon.hash(dto.password); // Add 'await' here

    try {
      // 2. Save the new user in the database
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
          hash: true,
        },
      });
      // 3. Return the created user
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if ((error.code = 'P2002')) {
          throw new ForbiddenException('Credentials taken');
        }
      }
    }
  }

  async signin(dto: SigninDto) {
    //find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    //If user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    //compare password
    const pwMatches = await argon.verify(user.hash, dto.password);

    //If password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    //send back the user
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };

    const secret = this.config.get<string>('JWT_SECRET'); // correct key

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '12h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }
}
