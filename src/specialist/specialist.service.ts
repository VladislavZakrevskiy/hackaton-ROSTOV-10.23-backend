import { Injectable } from '@nestjs/common';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { PrismaService } from '@/common/services';
import { SpecialistModel } from '@/models/specialist.model';
import { SpecialistWithFeedback } from './dto/specialist-with-feedback.model';

@Injectable()
export class SpecialistService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSpecialistDto: CreateSpecialistDto): Promise<SpecialistModel> {
    return this.prisma.specialist.create({ data: createSpecialistDto });
  }

  findAll(): Promise<SpecialistModel[]> {
    return this.prisma.specialist.findMany();
  }

  async findOne(id: string): Promise<SpecialistWithFeedback> {
    const specialist = await this.prisma.specialist.findUniqueOrThrow({
      where: { id },
      include: { feedbacks: true },
    });
    const score =
      specialist.feedbacks.reduce((acc, v) => acc + v.score, 0) /
      specialist.feedbacks.length;
    return { ...specialist, score };
  }

  update(
    id: string,
    updateSpecialistDto: UpdateSpecialistDto,
  ): Promise<SpecialistModel> {
    return this.prisma.specialist.update({
      where: { id },
      data: updateSpecialistDto,
    });
  }

  remove(id: string) {
    return this.prisma.specialist.delete({ where: { id } });
  }
}
