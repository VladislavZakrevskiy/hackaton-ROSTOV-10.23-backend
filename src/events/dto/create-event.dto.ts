import { ClearEventModel } from '@/models/clear-event.model';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto extends OmitType(ClearEventModel, ['id']) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  specialist_id: string;
}
