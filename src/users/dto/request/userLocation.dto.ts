import { IsString, IsNumber, IsOptional } from 'class-validator';

export class Location {
  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsString()
  province: string;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsNumber()
  lat: number;

  @IsOptional()
  @IsNumber()
  lng: number;
}