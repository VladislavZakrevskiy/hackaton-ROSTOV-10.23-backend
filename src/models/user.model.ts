import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { CommentModel } from './comment.model';
import { Type } from 'class-transformer';
import { NotificationModel } from './notitification.model';
import { FeedbackModel } from './feedback.model';

export class UserModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;

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
  @ApiProperty({ required: false })
  image_url: string;

  @IsEnum(Role)
  @ApiProperty({ required: false, enum: Role })
  role: Role;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: CommentModel })
  @Type(() => CommentModel)
  comments: CommentModel[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: NotificationModel })
  @Type(() => NotificationModel)
  notifications: NotificationModel[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: FeedbackModel })
  @Type(() => FeedbackModel)
  feedbacks: FeedbackModel[];
}
