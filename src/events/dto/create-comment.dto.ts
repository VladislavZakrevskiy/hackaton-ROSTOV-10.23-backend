import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(512)
  @ApiProperty({
    type: String,
    maxLength: 512,
    minLength: 1,
    required: true,
  })
  text: string;
}
