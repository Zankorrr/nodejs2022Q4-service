import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUsersStore {
  findAll: () => UserEntity[];
  findOne: (id: string) => UserEntity | undefined;
  create: (userDto: CreateUserDto) => UserEntity;
  update: (id: string, userDto: UpdateUserDto) => UserEntity;
  delete: (id: string) => void;
}
