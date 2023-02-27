import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import 'dotenv/config';

const userOutput = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private async getToken(userId: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
      },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
    return { accessToken };
  }

  async signup(userDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: userDto.login },
    });
    if (user) {
      return null;
    } else {
      const date = Date.now();
      return await this.prisma.user.create({
        data: {
          login: userDto.login,
          password: userDto.password,
          createdAt: date,
          updatedAt: date,
        },
        select: userOutput,
      });
    }
  }

  async login(userDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { login: userDto.login },
    });
    if (user && user.password === userDto.password) {
      const token = await this.getToken(user.id);
      return token;
    } else {
      return null;
    }
  }
}
