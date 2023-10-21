import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class SpecialistModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 32 })
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 32 })
  last_name: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 32 })
  social_link: string;
}
