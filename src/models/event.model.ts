import { ApiProperty } from '@nestjs/swagger';
import { EventStatus } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CommentModel } from './comment.model';
import { Type } from 'class-transformer';
import { NotificationModel } from './notitification.model';
import { CredentialsModel } from './credentials.model';
import { FeedbackModel } from './feedback.model';
import { UserModel } from './user.model';
import { SpecialistModel } from './specialist.model';

export class EventModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  specialist_id: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: CommentModel })
  @Type(() => CommentModel)
  comments: CommentModel[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: CredentialsModel })
  @Type(() => CredentialsModel)
  credentials: CredentialsModel[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: NotificationModel })
  @Type(() => NotificationModel)
  notifications: NotificationModel[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: SpecialistModel })
  @Type(() => SpecialistModel)
  specialists: SpecialistModel[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: FeedbackModel })
  @Type(() => FeedbackModel)
  feedbacks: FeedbackModel[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: UserModel })
  @Type(() => UserModel)
  users: UserModel[];
}
