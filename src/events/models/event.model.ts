import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class EventModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
  })
  image_link: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    required: false,
  })
  record_link: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(128)
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 128,
    required: true,
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(512)
  @ApiProperty({
    type: String,
    minLength: 1,
    maxLength: 512,
    required: true,
  })
  description: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: Date,
    required: true,
  })
  start_date: Date;

  @IsEnum(EventStatus)
  @IsNotEmpty()
  @ApiProperty({
    enum: EventStatus,
    required: false,
  })
  status: EventStatus;
}
