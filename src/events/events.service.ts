import { PrismaService } from '@/common/services';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Event, Feedback, Specialist, EventStatus } from '@prisma/client';
import { CreateEventDto } from './dto/create-event.dto';
import { CreateFeedDto } from './dto/add-feedback.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const events = await this.prisma.event.findMany();
    return events;
  }

  async getById(id: string) {
    try {
      const event = await this.prisma.event.findFirst({
        where: { id },
        include: {
          comments: true,
          feedbacks: true,
        },
      });
      return event;
    } catch (error) {
      throw new BadRequestException('Not valid id');
    }
  }

  async groupEventsByStatusAndDays(): Promise<
    { status: EventStatus; date: Date; events: Event[] }[]
  > {
    const events = await this.prisma.event.findMany();
    const groupedEvents = events.reduce((result, event) => {
      const status = event.status;
      const startDate = event.start_date;

      const existingGroup = result.find(
        (group) =>
          group.status === status && this.isSameDay(group.date, startDate),
      );

      if (existingGroup) {
        existingGroup.events.push(event);
      } else {
        result.push({ status, date: startDate, events: [event] });
      }

      return result;
    }, [] as { status: EventStatus; date: Date; events: Event[] }[]);

    return groupedEvents;
  }

  async groupEventsByStatus(): Promise<
    { status: EventStatus; events: Event[] }[]
  > {
    const events = await this.prisma.event.findMany();
    const groupedEvents = events.reduce((result, event) => {
      const status = event.status;
      const existingGroup = result.find((group) => group.status === status);

      if (existingGroup) {
        existingGroup.events.push(event);
      } else {
        result.push({ status: event.status, events: [event] });
      }

      return result;
    }, [] as { status: EventStatus; events: Event[] }[]);

    return groupedEvents;
  }

  private isSameDay(dateA: Date, dateB: Date): boolean {
    return (
      dateA.getFullYear() === dateB.getFullYear() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getDate() === dateB.getDate()
    );
  }

  async groupEventsByDays(): Promise<{ date: Date; events: Event[] }[]> {
    const events = await this.prisma.event.findMany();
    const groupedEvents = events.reduce((result, event) => {
      const startDate = event.start_date;
      const existingGroup = result.find((group) =>
        this.isSameDay(group.date, startDate),
      );

      if (existingGroup) {
        existingGroup.events.push(event);
      } else {
        result.push({ date: startDate, events: [event] });
      }

      return result;
    }, [] as { date: Date; events: Event[] }[]);

    return groupedEvents;
  }

  async createEvent(event: CreateEventDto) {
    try {
      const newEvent = await this.prisma.event.create({
        data: {
          description: event.description,
          link: event.link,
          name: event.name,
          start_date: event.start_date,
          status: event.status,
          record_link: event.record_link,
          specialist: {
            create: {
              first_name: event.specialist.first_name,
              last_name: event.specialist.last_name,
              social_link: event.specialist.social_link,
            },
          },
        },
      });
      return newEvent;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(event_id: string, updatedData: Partial<Event>): Promise<Event> {
    try {
      const updatedEvent = await this.prisma.event.update({
        where: { id: event_id },
        data: {
          ...updatedData,
          updated_at: new Date(),
        },
      });
      return updatedEvent;
    } catch (error) {
      throw new BadRequestException(`Error update event id: ${event_id}`);
    }
  }

  async addFeedBack(
    eventId: string,
    userId: string,
    feedback: CreateFeedDto,
  ) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Событие не найдено');
    }

    const newFeedback = await this.prisma.feedback.create({
      data: {
        score: feedback.score,
        text: feedback.text,
        event: { connect: { id: eventId } },
        user: { connect: { id: userId } },
        specialist: { connect: { id: event.specialist_id } },
      },
    });

    return newFeedback;
  }

  async specialistsRec(): Promise<Specialist[]> {
    const specialists = await this.prisma.specialist.findMany();

    if (specialists.length === 0) {
      return [];
    }

    const specialistPromises = specialists.map(
      async (specialist: Specialist) => {
        const feedbacks = await this.prisma.feedback.findMany({
          where: {
            specialist_id: specialist.id,
          },
        });

        if (feedbacks.length > 0) {
          const totalScore = feedbacks.reduce(
            (sum, feedback) => sum + feedback.score,
            0,
          );
          const averageScore = totalScore / feedbacks.length;

          if (averageScore >= 4) {
            return specialist;
          }
        }
      },
    );

    const specialistsAboveAverage = (await Promise.all(
      specialistPromises,
    )) as Specialist[];

    return specialistsAboveAverage;
  }

  private calculateAverageScore(feedbacks: Feedback[]): number {
    if (feedbacks.length === 0) {
      return 0;
    }

    const totalScore = feedbacks.reduce(
      (sum, feedback) => sum + feedback.score,
      0,
    );
    return totalScore / feedbacks.length;
  }

  async getEventStatistics(): Promise<{ name: string; value: number }[]> {
    const events = await this.prisma.event.findMany();

    const statisticsPromises = events.map(async (event) => {
      const feedbacks = await this.prisma.feedback.findMany({
        where: { event_id: event.id },
      });

      const averageScore = this.calculateAverageScore(feedbacks);
      return { name: event.name, value: averageScore };
    });

    const statistics = await Promise.all(statisticsPromises);
    return statistics;
  }  
}
