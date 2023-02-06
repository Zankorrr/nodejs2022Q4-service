import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { IUsersStore } from '../interfaces/user-store.interface';

@Injectable()
export class InMemoryUsersStore implements IUsersStore {
  private users: UserEntity[] = [];

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: string): UserEntity | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(userDto: CreateUserDto): UserEntity {
    const newUser = {
      ...userDto,
      id: uuid(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, userDto: UpdateUserDto): UserEntity {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        user.password = userDto.newPassword;
        user.version++;
        user.updatedAt = Date.now();
      }
      return user;
    });
    return this.users.find((user) => user.id === id);
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
