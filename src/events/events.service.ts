import { PrismaService } from '@/common/services';
import { Injectable } from '@nestjs/common';
import { Comment, Event, Specialist } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  getById(id: string): Promise<Event> {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        comments: true,
        feedbacks: true,
        credentials: true,
      },
    });
  }

  createEvent(event: CreateEventDto) {
    const { specialist_id, ...eventData } = event;
    return this.prisma.event.create({
      data: {
        ...eventData,
        specialist: { connect: { id: specialist_id } },
      },
    });
  }

  async update(event_id: string, updatedData: UpdateEventDto): Promise<Event> {
    const updatedEvent = await this.prisma.event.update({
      where: { id: event_id },
      data: {
        ...updatedData,
      },
    });
    return updatedEvent;
  }

  addComment(
    eventId: string,
    userId: string,
    data: CreateCommentDto,
  ): Promise<Comment> {
    return this.prisma.comment.create({
      data: {
        event_id: eventId,
        user_id: userId,
        ...data,
      },
    });
  }

  async specialistsRecomendations(): Promise<Specialist[]> {
    const specialists = await this.prisma.specialist.findMany({
      include: {
        feedbacks: {
          select: {
            score: true,
          },
        },
      },
    });

    const sortedSpecialists = specialists
      .map((s) => {
        const { feedbacks, ...data } = s;
        const totalScores = feedbacks.reduce((acc, v) => acc + v.score, 0);
        return { ...data, scores: totalScores };
      })
      .sort((a, b) => a.scores - b.scores);

    return sortedSpecialists.slice(0, 5);
  }

  async eventStatistics(eventId: string) {
    const registredUsers = await this.prisma.user.findMany({
      where: {
        events: {
          some: {
            id: eventId,
          },
        },
      },
    });
    return { registredUsersCount: registredUsers.length };
  }
}
