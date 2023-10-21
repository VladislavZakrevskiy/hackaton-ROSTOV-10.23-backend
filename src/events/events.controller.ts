import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event, Specialist } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateFeedDto } from './dto/add-feedback.dto';

@Controller('event')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('/all')
  async getAll(): Promise<Event[]> {
    return await this.eventService.getAll();
  }

  @Get('/stats')
  async getStats() {
    return await this.eventService.getEventStatistics();
  }

  @Get('/group-by-days')
  async groupByDay() {
    return await this.eventService.groupEventsByDays();
  }

  @Get('/group-by-status')
  async groupByStatus() {
    return await this.eventService.groupEventsByStatus();
  }

  @Get('/group-by-day-status')
  async groupByStatusAndDays() {
    return await this.eventService.groupEventsByStatusAndDays();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Event> {
    return await this.eventService.getById(id);
  }

  @Post()
  async createEvent(body: CreateEventDto) {
    return await this.eventService.createEvent(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, data: Partial<Event>) {
    return await this.eventService.update(id, data);
  }

  @Post(':id/feedback')
  async addFeedback(
    @Param('id') id: string,
    userId: string,
    @Body() body: CreateFeedDto,
  ) {
    return await this.eventService.addFeedBack(id, userId, body);
  }

  @Get('recommendations')
  async recommendations(): Promise<Specialist[]> {
    return await this.eventService.specialistsRec();
  }
}
