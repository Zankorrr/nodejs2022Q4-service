import { Exclude } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserEntity {
  constructor(userDto: CreateUserDto) {
    const date = Date.now();
    this.id = uuid();
    this.login = userDto.login;
    this.password = userDto.password;
    this.version = 1;
    this.createdAt = date;
    this.updatedAt = date;
  }

  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of update
}
