import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface StudentCreationAttrs {
  firstname: string;
  surname: string;
  nickname: string;
  email: string;
  password: string;
  birthDay: string;
}

interface MentorCreationAttrs {
  firstname: string;
  surname: string;
  nickname: string;
  email: string;
  password: string;
  birthDay: string;
  isWorked: boolean;
  workExperience: string;
}

@Table({ tableName: 'students' })
export class Student extends Model<Student, StudentCreationAttrs> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  nickname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  birthDay: string;
}

@Table({ tableName: 'mentors' })
export class Mentor extends Model<Mentor, MentorCreationAttrs> {
  @Column({
    type: DataType.UUID,
    unique: true,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  nickname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  birthDay: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  notWorked: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  workExperience: string;
}
