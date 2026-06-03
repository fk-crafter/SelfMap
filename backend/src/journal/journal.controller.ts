import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { JournalService } from './journal.service';

@Controller('api/journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Get()
  async getEntries(@Headers('x-user-id') userId: string) {
    if (!userId) throw new UnauthorizedException('User not identified');
    return this.journalService.getEntries(userId);
  }

  @Post()
  async createEntry(
    @Headers('x-user-id') userId: string,
    @Body('content') content: string,
  ) {
    if (!userId) throw new UnauthorizedException('User not identified');
    return this.journalService.createEntry(userId, content);
  }
}
