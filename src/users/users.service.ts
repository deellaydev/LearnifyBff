import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Mentor, Student } from './users.model';
import { BaseUserDto, MentorDto } from './dto/base-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Student) private studentRepository: typeof Student,
    @InjectModel(Mentor) private mentorRepository: typeof Mentor,
  ) {}

  async createStudent(dto: BaseUserDto) {
    const student = await this.studentRepository.create(dto);
    return student;
  }

  async updateStudent(dto: BaseUserDto) {
    //@ts-ignore
    const user = await this.studentRepository.findByPk(dto.id);
    if (!user) return;

    user.firstname = dto.firstname;
    user.surname = dto.surname;

    await user.save();
    return user;
  }

  async updateMentor(dto: MentorDto) {
    //@ts-ignore
    const user = await this.mentorRepository.findByPk(dto.id);
    if (!user) return;

    user.firstname = dto.firstname;
    user.surname = dto.surname;
    user.notWorked = dto.notWorked;
    user.workExperience = dto.workExperience
      .map(({ workPlace, experience }) => `${workPlace}/${experience}`)
      .join(';');

    await user.save();
    return user;
  }

  async getAllStudents() {
    const students = await this.studentRepository.findAll({
      include: { all: true },
    });
    return students;
  }

  async getStudentByEmail(email: string) {
    const student = await this.studentRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return student;
  }

  async createMentor(dto: MentorDto) {
    const _dto = {
      ...dto,
      workExperience: dto.workExperience
        .map(({ workPlace, experience }) => `${workPlace}/${experience}`)
        .join(';'),
    };
    const mentor = await this.mentorRepository.create(_dto);
    return mentor;
  }

  async getAllMentors() {
    const mentors = await this.mentorRepository.findAll({
      include: { all: true },
    });
    return mentors;
  }

  async getMentorByEmail(email: string) {
    const mentor = await this.mentorRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return mentor;
  }
}
