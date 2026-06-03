import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
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

  @Delete(':id')
  async deleteEntry(
    @Headers('x-user-id') userId: string,
    @Param('id') id: string,
  ) {
    if (!userId) throw new UnauthorizedException('User not identified');
    return this.journalService.deleteEntry(id, userId);
  }
}
