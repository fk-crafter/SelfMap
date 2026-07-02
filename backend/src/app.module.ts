import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { JournalModule } from './journal/journal.module';
import { AiController } from './ai/ai.controller';
import { AiService } from './ai/ai.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), ChatModule, JournalModule, PrismaModule],
  controllers: [AiController],
  providers: [AiService],
})
export class AppModule {}
