export class UserCoursesDto {
  readonly userId: string;
  readonly courseId: string;

  readonly progress: string;
}

export class GetOrCreateUserCourseDto {
  userId: string;
  courseId: string;
}
