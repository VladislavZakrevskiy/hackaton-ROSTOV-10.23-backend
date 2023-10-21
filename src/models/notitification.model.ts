import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class NotificationModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  event_id: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty({ maxLength: 128 })
  text: string;
}
