import { UserDto } from './dto/user.dto';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersStore } from './interfaces/user-store.interface';
import { validate } from 'uuid';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('IUsersStore') private storage: IUsersStore) {}

  create(userDto: CreateUserDto) {
    if (!userDto.login || !userDto.password) {
      throw new BadRequestException(
        'Request body must contain required fields',
      );
    }
    const { password, ...rest } = this.storage.create(userDto);
    return rest;
  }

  findAll(): UserDto[] {
    return this.storage.findAll().map((user) => {
      const { password, ...rest } = user;
      return rest;
    });
  }

  findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UserId is invalid (not uuid)');
    }
    const user: UserEntity = this.storage.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...rest } = user;
    return rest;
  }

  update(id: string, userDto: UpdateUserDto) {
    if (!validate(id)) {
      throw new BadRequestException('UserId is invalid (not uuid)');
    }
    if (!userDto.oldPassword || !userDto.newPassword) {
      throw new BadRequestException(
        'Request body must contain required fields',
      );
    }
    const user = this.storage.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (userDto.oldPassword !== user.password) {
      throw new ForbiddenException('Wrong password');
    }
    const { password, ...rest } = this.storage.update(id, userDto);
    return rest;
  }

  delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('UserId is invalid (not uuid)');
    }
    const user: UserDto = this.storage.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.storage.delete(id);
  }
}
