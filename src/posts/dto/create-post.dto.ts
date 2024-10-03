import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Location } from './postLocation.dto';

export class CreatePostDto {
  @IsString() 
  job_position: string;

  @ValidateNested()
  @Type(() => Location) 
  location?: Location;

  @IsNumber() 
  salary: number;

  @IsString() 
  description: string;
}
