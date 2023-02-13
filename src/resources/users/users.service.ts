import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InMemoryDB } from '../../db/in-memory.db';

@Injectable()
export class UsersService {
  constructor(private db: InMemoryDB) {}

  create(userDto: CreateUserDto) {
    const newUser = new UserEntity(userDto);
    this.db.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.db.users;
  }

  findOne(id: string) {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    const user = this.db.users[userIndex];
    return user;
  }

  update(id: string, userDto: UpdateUserDto) {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    const user = this.db.users[userIndex];
    if (userDto.oldPassword !== user.password) {
      throw new ForbiddenException('Wrong password');
    }
    user.password = userDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();
    return user;
  }

  remove(id: string) {
    const userIndex = this.db.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }
    this.db.users.splice(userIndex, 1);
  }
}
