import { IsEmail, IsNumber, IsOptional, IsString, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { Location } from './userLocation.dto';
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

  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location?: Location;
}
