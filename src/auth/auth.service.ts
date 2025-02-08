import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseUserDto, MentorDto } from '../users/dto/base-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Mentor, Student } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: BaseUserDto) {
    const user = await this.validateUser(userDto);
    const { token } = await this.generateToken(user);
    return {
      token,
      user,
    };
  }

  async registration(userDto: BaseUserDto | MentorDto) {
    const createMethod = userDto.isMentor ? 'createMentor' : 'createStudent';
    const checkMethod = userDto.isMentor
      ? 'getMentorByEmail'
      : 'getStudentByEmail';

    const candidate = await this.userService[checkMethod](userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService[createMethod]({
      ...userDto,
      password: hashPassword,
    } as never);
    return this.generateToken(user);
  }

  private async generateToken(user: Student | Mentor) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: BaseUserDto) {
    let user;
    //@ts-ignore
    if (!userDto.asMentor) {
      user = await this.userService.getStudentByEmail(userDto.email);
    } else {
      user = await this.userService.getMentorByEmail(userDto.email);
    }
    if (!user) {
      throw new HttpException('email.wrong', HttpStatus.BAD_REQUEST);
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new HttpException('password.wrong', HttpStatus.BAD_REQUEST);
  }
}
