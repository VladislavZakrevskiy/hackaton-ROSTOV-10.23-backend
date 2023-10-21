import { OmitType } from '@nestjs/swagger';
import { UserModel } from './user.model';

export class ClearUserModel extends OmitType(UserModel, [
  'feedbacks',
  'comments',
  'notifications',
]) {}
