import { ClearEventModel } from '@/models/clear-event.model';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateEventDto extends PartialType(
  OmitType(ClearEventModel, ['id']),
) {}
