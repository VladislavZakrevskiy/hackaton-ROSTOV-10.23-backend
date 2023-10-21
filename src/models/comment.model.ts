import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ maxLength: 512, required: true })
  text: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;
}
