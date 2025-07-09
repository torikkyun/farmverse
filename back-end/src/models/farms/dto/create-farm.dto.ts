import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  location: string;

  @IsNumber()
  size: number;

  @IsOptional()
  @IsString({ each: true })
  images?: string[];
}
