import { CredentialsModel } from '@/models/credentials.model';
import { OmitType } from '@nestjs/swagger';

export class AddCredentialDto extends OmitType(CredentialsModel, [
  'id',
  'event_id',
]) {}
