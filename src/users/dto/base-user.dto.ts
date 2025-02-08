interface WorkExperience {
  workPlace: string;
  experience: number;
}

export class BaseUserDto {
  readonly firstname: string;
  readonly surname: string;

  readonly nickname: string;

  readonly email: string;
  readonly password: string;

  readonly birthday: string;

  readonly isMentor: boolean;
}

export class MentorDto extends BaseUserDto {
  notWorked: boolean;

  workExperience: WorkExperience[];
}
