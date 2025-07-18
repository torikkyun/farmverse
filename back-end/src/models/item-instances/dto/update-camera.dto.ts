import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { IsString } from 'class-validator';

export class UpdateCameraDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  cameraUrl?: string;
}
