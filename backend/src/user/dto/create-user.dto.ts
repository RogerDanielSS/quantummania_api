export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  level?: number;
  score?: number;
}
