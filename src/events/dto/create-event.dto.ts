import {
  IsString,
  IsOptional,
  IsDate,
  IsEnum,
  IsArray,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export enum EventStatus {
    PUBLISHED = 'PUBLISHED',
    FINISHED = 'FINISHED'
}
  
export class CreateEventDto {
    @IsString()
    description: string;
  
    @IsString()
    link: string;
  
    @IsString()
    name: string;
  
    @IsDate()
    start_date: Date;
  
    @IsEnum(EventStatus)
    status: EventStatus;
  
    @IsString()
    record_link: string;
  
    @ValidateNested()
    specialist: SpecialistDTO
}


class SpecialistDTO {
    @IsString()
    first_name: string;
  
    @IsString()
    last_name: string;
  
    @IsString()
    social_link: string;
}