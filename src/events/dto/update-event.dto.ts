import { OmitType, PartialType } from '@nestjs/swagger';
import { EventModel } from '../models/event.model';

export class UpdateEventDto extends PartialType(OmitType(EventModel, ['id'])) {}
