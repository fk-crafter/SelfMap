import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';
import { auth } from './auth';
import { fromNodeHeaders } from 'better-auth/node';

@Controller('users')
export class UserController {
  @Get('me')
  async getProfile(@Req() req: Request) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    return { user: session?.user };
  }

  @Get('public')
  getPublicData() {
    return { message: 'Accessible par tous' };
  }
}
