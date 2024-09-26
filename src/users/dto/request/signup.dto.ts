import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Signup {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
