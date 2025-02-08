import { Body, Controller, Get, Post } from '@nestjs/common';
import { BaseUserDto } from './dto/base-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: BaseUserDto) {
    return this.usersService.createStudent(userDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAllStudents();
  }
}
