import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RolesGuard } from '@/common/guards';
import { Authorized } from '../guards/auth.guard';

export function Roles(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(RolesGuard, Authorized),
  );
}
