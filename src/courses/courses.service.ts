import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Course, CourseAttrs, UserCourses } from './courses.model';
import { CreateCourseDto, UpdateUserCourseProgressDto } from './dto/courses';
import { GetOrCreateUserCourseDto, UserCoursesDto } from './dto/user-courses';
import { WhereOptions } from 'sequelize';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course)
    private courseModel: typeof Course,
    @InjectModel(UserCourses)
    private userCoursesModel: typeof UserCourses,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    // Если rating не указан, можно задать значение по умолчанию
    const course = await this.courseModel.create({
      ...createCourseDto,
      rating: createCourseDto.rating ?? 0,
    });
    return course;
  }

  async findAllSummary(): Promise<Partial<Course>[]> {
    return this.courseModel.findAll({
      attributes: ['id', 'name', 'author', 'category', 'endDate', 'rating'],
    });
  }

  async findById(id: string): Promise<Course> {
    // @ts-ignore
    const where: WhereOptions<CourseAttrs> = { id };
    const course = await this.courseModel.findOne({ where });
    if (!course) {
      throw new NotFoundException(`Курс с id ${id} не найден`);
    }
    return course;
  }

  async getOrCreate(dto: GetOrCreateUserCourseDto): Promise<UserCourses> {
    const { userId, courseId } = dto;
    const [record, created] = await this.userCoursesModel.findOrCreate({
      where: { userId, courseId },
      defaults: { progress: '0,0' } as Partial<UserCoursesDto>,
    });
    return record;
  }

  async getCoursesByUserId(
    userId: string,
  ): Promise<{ id: string; name: string }[]> {
    const userCourses = await this.userCoursesModel.findAll({
      where: { userId },
      include: [
        {
          model: Course,
          attributes: ['id', 'name'],
        },
      ],
    });

    return userCourses
      .map((uc) => uc.course)
      .filter((course): course is Course => !!course)
      .map((course) => ({ id: course.id, name: course.name }));
  }

  async updateProgress(dto: UpdateUserCourseProgressDto): Promise<UserCourses> {
    const { userId, courseId, progress } = dto;
    const record = await this.userCoursesModel.findOne({
      where: { userId, courseId },
    });
    if (!record) {
      throw new NotFoundException(
        `Запись user_course не найдена для userId ${userId} и courseId ${courseId}`,
      );
    }
    record.progress = progress;
    await record.save();
    return record;
  }
}
