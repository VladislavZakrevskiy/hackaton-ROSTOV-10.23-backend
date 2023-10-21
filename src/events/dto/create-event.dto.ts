import { ClearEventModel } from '@/models/clear-event.model';
import { CredentialsModel } from '@/models/credentials.model';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateEventDto extends OmitType(ClearEventModel, ['id']) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  specialist_id: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @ApiProperty({ required: false, isArray: true, type: CredentialsModel })
  @Type(() => CredentialsModel)
  credentials: CredentialsModel[];
}
