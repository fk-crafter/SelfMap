import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { JournalModule } from './journal/journal.module';

@Module({
  imports: [ChatModule, JournalModule],
})
export class AppModule {}
