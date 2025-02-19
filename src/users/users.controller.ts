import { Body, Controller, Get, Post } from '@nestjs/common';
import { BaseUserDto, MentorDto } from './dto/base-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: BaseUserDto) {
    return this.usersService.createStudent(userDto);
  }

  @Post('update')
  update(@Body() userDto: BaseUserDto | MentorDto) {
    const method = userDto.isMentor ? 'updateMentor' : 'updateStudent';
    //@ts-ignore
    return this.usersService[method](userDto);
  }

  @Get()
  getAll() {
    return this.usersService.getAllStudents();
  }
}
