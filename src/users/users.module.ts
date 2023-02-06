import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryUsersStore } from './store/users.store';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'IUsersStore',
      useClass: InMemoryUsersStore,
    },
  ],
})
export class UsersModule {}
