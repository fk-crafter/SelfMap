import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AiService } from '../ai/ai.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, AiService, PrismaService],
})
export class ChatModule {}
