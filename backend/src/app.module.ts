import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { JournalModule } from './journal/journal.module';
import { AiController } from './ai/ai.controller';
import { AiService } from './ai/ai.service';

@Module({
  imports: [ConfigModule.forRoot(), ChatModule, JournalModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AppModule {}
