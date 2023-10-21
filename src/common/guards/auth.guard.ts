import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PrismaService } from '../services';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { Role } from '@prisma/client';

@Injectable()
export class Authorized implements CanActivate {
  private readonly client: OAuth2Client;
  constructor(
    private prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    this.client = new OAuth2Client(
      config.get('GOOGLE_CLIENT_ID'),
      config.get('GOOGLE_CLIENT_SECRET'),
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);

    const token = request.headers['authorization'];

    if (!token) return false;
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.config.get('GOOGLE_CLIENT_ID'),
      });
      const userData = ticket.getPayload();
      const userCandidate = await this.prisma.user.findUnique({
        where: { email: userData.email },
      });
      if (userCandidate) {
        request['user'] = userCandidate;
      } else {
        const newUser = await this.prisma.user.create({
          data: {
            email: userData.email,
            first_name: userData.given_name,
            last_name: userData.family_name,
            role: Role.USER,
          },
        });
        request['user'] = newUser;
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
