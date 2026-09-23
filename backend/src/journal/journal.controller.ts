import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JournalService } from './journal.service';
import type { Request } from 'express';
import { auth } from '../auth';
import { fromNodeHeaders } from 'better-auth/node';

@Controller('api/journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  async getEntries(@Req() req: Request) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.user) throw new UnauthorizedException('User not identified');

    return this.journalService.getEntries(session.user.id);
  }

  @Post()
  async createEntry(@Req() req: Request, @Body('content') content: string) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.user) throw new UnauthorizedException('User not identified');

    return this.journalService.createEntry(session.user.id, content);
  }

  @Delete(':id')
  async deleteEntry(@Req() req: Request, @Param('id') id: string) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.user) throw new UnauthorizedException('User not identified');

    return this.journalService.deleteEntry(id, session.user.id);
  }
}
