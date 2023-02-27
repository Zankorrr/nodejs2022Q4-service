import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  Post,
} from '@nestjs/common';
import { Public } from '../../public.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async signup(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signup(userDto);
    if (!user) {
      throw new ForbiddenException('User already exists, please login');
    } else {
      return user;
    }
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() userDto: CreateUserDto) {
    const token = await this.authService.login(userDto);
    if (!token) {
      throw new ForbiddenException('Wrong username or password');
    } else {
      return token;
    }
  }
}
