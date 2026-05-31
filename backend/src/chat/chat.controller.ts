import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('history')
  async getHistory(@Headers('x-user-id') userId: string) {
    if (!userId) throw new UnauthorizedException('User not identified');

    return this.chatService.getOrCreateConversation(userId);
  }

  @Post('send')
  async sendMessage(
    @Headers('x-user-id') userId: string,
    @Body('content') content: string,
  ) {
    if (!userId) throw new UnauthorizedException('User not identified');

    return this.chatService.sendMessage(userId, content);
  }
}
