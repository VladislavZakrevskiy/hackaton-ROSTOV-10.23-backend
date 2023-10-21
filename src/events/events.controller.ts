import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Event, Role, Specialist, User } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { GUser } from '@/common/decorators/user.decorator';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiBody, ApiOkResponse, OmitType } from '@nestjs/swagger';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventModel } from '@/models/event.model';
import { CommentModel } from '@/models/comment.model';
import { ClearEventModel } from '@/models/clear-event.model';
import { Authorized } from '@/common/guards/auth.guard';
import { Roles } from '@/common/decorators';

@Controller('event')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('/all')
  @ApiOkResponse({
    type: OmitType(EventModel, [
      'users',
      'feedbacks',
      'specialists',
      'notifications',
      'credentials',
    ]),
    isArray: true,
  })
  getAll(): Promise<ClearEventModel[]> {
    return this.eventService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    type: OmitType(EventModel, [
      'users',
      'feedbacks',
      'specialists',
      'notifications',
    ]),
  })
  getById(@Param('id') id: string): Promise<Event> {
    return this.eventService.getById(id);
  }

  @Post()
  @ApiOkResponse({ type: ClearEventModel })
  @ApiBody({ type: CreateEventDto })
  createEvent(body: CreateEventDto): Promise<ClearEventModel> {
    return this.eventService.createEvent(body);
  }

  @Put(':id')
  @ApiOkResponse({ type: ClearEventModel })
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBody({ type: UpdateEventDto })
  update(
    @Param('id') id: string,
    data: UpdateEventDto,
  ): Promise<ClearEventModel> {
    return this.eventService.update(id, data);
  }

  @Post(':id/comment')
  @ApiOkResponse({ type: CommentModel })
  @UseGuards(Authorized)
  @ApiBody({ type: CreateCommentDto })
  addComment(
    @Param('id') id: string,
    @GUser() user: User,
    @Body() body: CreateCommentDto,
  ): Promise<CommentModel> {
    return this.eventService.addComment(id, user.id, body);
  }

  @Get('recommendations')
  recommendations(): Promise<Specialist[]> {
    return this.eventService.specialistsRecomendations();
  }
}
