import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event, Specialist, User } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { GUser } from '@/common/decorators/user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('event')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('/all')
  getAll(): Promise<Event[]> {
    return this.eventService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Event> {
    return this.eventService.getById(id);
  }

  @Post()
  createEvent(body: CreateEventDto) {
    return this.eventService.createEvent(body);
  }

  @Put(':id')
  update(@Param('id') id: string, data: Partial<Event>) {
    return this.eventService.update(id, data);
  }

  @Post(':id/comment')
  addComment(
    @Param('id') id: string,
    @GUser() user: User,
    @Body() body: CreateCommentDto,
  ) {
    return this.eventService.addComment(id, user.id, body);
  }

  @Get('recommendations')
  recommendations(): Promise<Specialist[]> {
    return this.eventService.specialistsRecomendations();
  }
}
