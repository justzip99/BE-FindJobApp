import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Location } from "./postLocation.dto";

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  job_position: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Location)
  location?: Location;

  @IsNumber()
  @IsOptional()
  salary: number;

  @IsString()
  @IsOptional()
  description: string;
}
