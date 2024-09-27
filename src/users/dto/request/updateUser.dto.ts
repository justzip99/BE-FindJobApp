import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  @IsString()
  resume: string;

  @IsNumber()
  balance: number;
}
