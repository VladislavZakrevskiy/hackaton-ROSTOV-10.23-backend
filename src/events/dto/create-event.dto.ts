import { ApiProperty, OmitType } from '@nestjs/swagger';
import { EventModel } from '../models/event.model';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto extends OmitType(EventModel, ['id']) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  specialist_id: string;
}

