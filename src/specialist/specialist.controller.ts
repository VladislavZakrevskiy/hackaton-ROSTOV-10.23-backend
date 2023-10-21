import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SpecialistModel } from '@/models/specialist.model';
import { SpecialistWithFeedback } from './dto/specialist-with-feedback.model';

@ApiTags('specialist')
@Controller('specialist')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Post()
  @ApiBody({ type: CreateSpecialistDto })
  @ApiOkResponse({ type: SpecialistModel })
  create(@Body() createSpecialistDto: CreateSpecialistDto) {
    return this.specialistService.create(createSpecialistDto);
  }

  @Get()
  @ApiOkResponse({ type: SpecialistModel, isArray: true })
  findAll(): Promise<SpecialistModel[]> {
    return this.specialistService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SpecialistWithFeedback })
  findOne(@Param('id') id: string): Promise<SpecialistWithFeedback> {
    return this.specialistService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSpecialistDto })
  @ApiOkResponse({ type: SpecialistModel })
  update(
    @Param('id') id: string,
    @Body() updateSpecialistDto: UpdateSpecialistDto,
  ): Promise<SpecialistModel> {
    return this.specialistService.update(id, updateSpecialistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialistService.remove(id);
  }
}
