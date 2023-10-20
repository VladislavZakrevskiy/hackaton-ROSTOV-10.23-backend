import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/services';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }
}
