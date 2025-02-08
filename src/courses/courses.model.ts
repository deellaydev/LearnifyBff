import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Student } from '../users/users.model';

// Интерфейсы для вложенной структуры шагов курса
export interface StepContent {
  description: string;
  duration: string;
  __html: string;
}

export interface StepChild {
  title: string;
  content: StepContent;
  status: string;
}

export interface CourseStep {
  title: string;
  children: StepChild[];
}

// Интерфейс атрибутов курса с добавлением новых полей
export interface CourseAttrs {
  name: string;
  steps: CourseStep[];
  author: string;
  category: string;
  endDate: string;
  rating: number;
}

@Table({
  tableName: 'courses',
  timestamps: false, // Можно включить timestamps, если нужны createdAt/updatedAt
})
export class Course extends Model<CourseAttrs> implements CourseAttrs {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  name!: string;

  @AllowNull(false)
  @Column({
    type: DataType.JSON,
  })
  steps!: CourseStep[];

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  author!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  category!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  endDate!: string;

  @AllowNull(false)
  @Default(0)
  @Column({
    type: DataType.FLOAT,
  })
  rating!: number;
}

interface UserCoursesAttrs {
  userId: string;
  courseId: string;

  progress: string;
}

@Table({
  tableName: 'user_courses',
  timestamps: false,
})
export class UserCourses
  extends Model<UserCoursesAttrs>
  implements UserCoursesAttrs
{
  @PrimaryKey
  @ForeignKey(() => Student)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId!: string;

  @PrimaryKey
  @ForeignKey(() => Course)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  courseId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  progress!: string;

  @BelongsTo(() => Student)
  student!: Student;

  @BelongsTo(() => Course)
  course!: Course;
}
