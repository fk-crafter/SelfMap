import { Module } from '@nestjs/common';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { AiService } from '../ai/ai.service';

@Module({
  controllers: [JournalController],
  providers: [JournalService, AiService],
})
export class JournalModule {}
