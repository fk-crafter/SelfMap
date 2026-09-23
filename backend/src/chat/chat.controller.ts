import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import type { Request } from 'express';
import { auth } from '../auth';
import { fromNodeHeaders } from 'better-auth/node';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('history')
  async getHistory(@Req() req: Request) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.user) throw new UnauthorizedException('User not identified');

    return this.chatService.getHistory(session.user.id);
  }

  @Post('send')
  async sendMessage(
    @Req() req: Request,
    @Headers('x-user-lang') userLang: string,
    @Body() body: { content: string },
  ) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.user) throw new UnauthorizedException('User not identified');

    const reply = await this.chatService.sendMessage(
      session.user.id,
      body.content,
      userLang,
    );

    return {
      reply: reply.content,
      newScore: reply.newScore,
    };
  }
}
