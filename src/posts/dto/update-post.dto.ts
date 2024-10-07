import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Location } from "./postLocation.dto";

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  job_position: string;

  @IsNumber()
  @IsOptional()
  salary: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsString()
  requirements: string;

  @IsOptional()
  @IsString()
  qualification: string;

  @IsOptional()
  @IsString()
  experience: string;

  @IsOptional()
  @IsString()
  jobType: string;

  @IsOptional()
  @IsString()
  specialization: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location: Location;
}
