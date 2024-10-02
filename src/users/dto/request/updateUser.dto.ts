import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  @IsOptional()
  userName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  skill: string;

  @IsString()
  @IsOptional()
  education: string;

  @IsString()
  @IsOptional()
  experience: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsString()
  @IsOptional()
  resume: string;

  @IsString()
  @IsOptional()
  avatarURL: string;

  @IsOptional()
  @IsNumber()
  balance: number;
}
