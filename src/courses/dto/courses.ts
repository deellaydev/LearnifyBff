export class StepContentDto {
  description: string;
  duration: string;
  __html: string;
}

export class StepChildDto {
  title: string;
  content: StepContentDto;
  status: string;
}

export class CourseStepDto {
  title: string;
  children: StepChildDto[];
}

export class CreateCourseDto {
  name: string;
  steps: CourseStepDto[];
  author: string;
  category: string;
  endDate: string;
  rating?: number;
}

export class UpdateUserCourseProgressDto {
  userId: string;
  courseId: string;
  progress: string;
}
