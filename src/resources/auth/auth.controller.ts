import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signup(userDto);
    if (!user) {
      throw new ForbiddenException('User already exists, please login');
    } else {
      return user;
    }
  }
}
