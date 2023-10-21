import { SpecialistModel } from '@/models/specialist.model';
import { OmitType } from '@nestjs/swagger';

export class CreateSpecialistDto extends OmitType(SpecialistModel, ['id']) {}
