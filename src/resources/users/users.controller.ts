import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersService.remove(id);
  }
}
