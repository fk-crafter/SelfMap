import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { JournalModule } from './journal/journal.module';
import { AiController } from './ai/ai.controller';
import { AiService } from './ai/ai.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { PolarModule } from './polar/polar.module';
import { SynthesisModule } from './synthesis/synthesis.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatModule,
    JournalModule,
    PrismaModule,
    PolarModule,
    SynthesisModule,
    NotificationsModule,
  ],
  controllers: [AiController, UserController],
  providers: [AiService],
})
export class AppModule {}
