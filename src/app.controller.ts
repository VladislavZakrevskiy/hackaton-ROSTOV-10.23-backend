import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GUser } from './common/decorators/user.decorator';
import { Authorized } from './common/guards/auth.guard';

@Controller()
export class AppController {
  @Get('/me')
  @UseGuards(Authorized)
  getUser(@GUser() me: User) {
    return me;
  }
}
