import { IsString, IsOptional } from 'class-validator';

export class SocialLinks {
  @IsString()
  @IsOptional()
  facebook: String;

  @IsString()
  @IsOptional()
  phoneNumber: String;

  @IsString()
  @IsOptional()
  other: String;
}
