import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  job_position: string;

  @IsString()
  @IsOptional()
  location: string;

  @IsNumber()
  @IsOptional()
  salary: number;

  @IsString()
  @IsOptional()
  description: string;
}
