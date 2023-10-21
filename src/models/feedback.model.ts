import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FeedbackModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  score: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  text: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  event_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  specialist_id: string;
}
