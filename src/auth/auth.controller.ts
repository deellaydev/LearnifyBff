import { Body, Controller, Post, Req } from '@nestjs/common';
import { BaseUserDto, MentorDto } from '../users/dto/base-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: BaseUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  registration(@Body() userDto: BaseUserDto | MentorDto) {
    return this.authService.registration(userDto);
  }
}
