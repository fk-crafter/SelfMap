import { Controller, Get } from '@nestjs/common';
import { Session, AllowAnonymous } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('users')
export class UserController {
  @Get('me')
  getProfile(@Session() session: UserSession) {
    return { user: session.user };
  }

  @AllowAnonymous()
  @Get('public')
  getPublicData() {
    return { message: 'Accessible par tous' };
  }
}
