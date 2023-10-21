import { PrismaService } from '@/common/services';
import { Injectable } from '@nestjs/common';
@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { user_id: userId },
    });
  }

  remove(id: string, userId: string) {
    return this.prisma.notification.delete({ where: { id, user_id: userId } });
  }
}
