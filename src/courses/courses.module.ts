import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course, UserCourses } from './courses.model';

@Module({
  controllers: [CourseController],
  providers: [CourseService],
  imports: [SequelizeModule.forFeature([UserCourses, Course])],
  exports: [CourseService],
})
export class CoursesModule {}
