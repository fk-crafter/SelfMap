import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AiService } from './ai.service';
import OpenAI from 'openai';

@Controller('api/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(
    @Headers('x-user-id') userId: string,
    @Body() body: { messages: OpenAI.Chat.ChatCompletionMessageParam[] },
  ) {
    const userInsight = '';

    const reply = await this.aiService.getCoachResponse(
      userInsight,
      body.messages,
    );

    return { reply };
  }
}
