import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  userName: string;

  @IsEmail()
  email: string;

  description: string;

  skill: string;

  education: string;

  experience: string;

  language: string;

  resume: string;

  @IsNumber()
  balance: number;
}
