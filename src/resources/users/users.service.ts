import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InMemoryDB } from '../../db/in-memory.db';

import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';

const userOutput = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(userDto: CreateUserDto) {
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

  async findAll() {
    return await this.prisma.user.findMany({ select: userOutput });
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: { id: id },
      select: userOutput,
    });
  }

  async update(id: string, userDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (userDto.oldPassword !== user.password) {
      return null;
    } else {
      await this.prisma.user.update({
        where: { id: id },
        data: {
          password: userDto.newPassword,
          version: { increment: 1 },
          updatedAt: Date.now(),
        },
      });
      return await this.prisma.user.findUnique({
        where: { id: id },
        select: userOutput,
      });
    }
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { id: id } });
  }
}
