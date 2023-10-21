import { Module } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { SpecialistController } from './specialist.controller';
import { PrismaService } from '@/common/services';

@Module({
  controllers: [SpecialistController],
  providers: [SpecialistService, PrismaService],
})
export class SpecialistModule {}
