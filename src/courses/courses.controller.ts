import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto, UpdateUserCourseProgressDto } from './dto/courses';
import { Course, UserCourses } from './courses.model';
import { GetOrCreateUserCourseDto } from './dto/user-courses';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('add-course')
  async create(
    @Body() createCourseDto: CreateCourseDto | CreateCourseDto[],
  ): Promise<Course> {
    if (Array.isArray(createCourseDto)) {
      for (const _createCourseDto of createCourseDto) {
        await this.courseService.create(_createCourseDto);
      }
      return;
    } else {
      return await this.courseService.create(createCourseDto);
    }
  }

  @Get('summary')
  async getCoursesSummary(): Promise<Partial<Course>[]> {
    return await this.courseService.findAllSummary();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    return this.courseService.findById(id);
  }

  @Post('get-or-create')
  async getOrCreate(
    @Body() dto: GetOrCreateUserCourseDto,
  ): Promise<UserCourses> {
    return this.courseService.getOrCreate(dto);
  }

  @Get('by-user/:userId')
  async getCoursesByUser(
    @Param('userId') userId: string,
  ): Promise<{ id: string; name: string }[]> {
    return await this.courseService.getCoursesByUserId(userId);
  }

  @Put('update-progress')
  async updateProgress(
    @Body() dto: UpdateUserCourseProgressDto,
  ): Promise<UserCourses> {
    return this.courseService.updateProgress(dto);
  }
}
