import { FeedbackModel } from '@/models/feedback.model';
import { SpecialistModel } from '@/models/specialist.model';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';

export class SpecialistWithFeedback extends SpecialistModel {
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: FeedbackModel })
  @Type(() => FeedbackModel)
  feedbacks: FeedbackModel[];

  @IsNumber()
  @ApiProperty()
  score: number;
}
