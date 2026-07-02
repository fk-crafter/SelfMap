import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('history')
  async getHistory(@Headers('x-user-id') userId: string) {
    return this.chatService.getHistory(userId);
  }

  @Post('send')
  async sendMessage(
    @Headers('x-user-id') userId: string,
    @Body() body: { content: string },
  ) {
    const reply = await this.chatService.sendMessage(userId, body.content);
    return { reply: reply.content };
  }
}
