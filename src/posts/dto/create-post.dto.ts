import { IsString, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Location } from './postLocation.dto';
import { SocialLinks } from './socialLinks.dto';

export class CreatePostDto {
  @IsString()
  job_position: string;

  @IsNumber()
  salary: number;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsString()
  qualification: string;

  @IsString()
  experience: string;

  @IsString()
  jobType: string;

  @IsString()
  specialization: string;

  @ValidateNested()
  @Type(() => Location)
  location: Location;

  @ValidateNested()
  @Type(() => SocialLinks)
  social: SocialLinks;
}
