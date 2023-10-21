import { OmitType } from '@nestjs/swagger';
import { EventModel } from './event.model';

export class ClearEventModel extends OmitType(EventModel, [
  'users',
  'feedbacks',
  'specialists',
  'comments',
  'notifications',
  'credentials',
]) {}
