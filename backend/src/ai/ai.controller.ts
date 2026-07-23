import {
  Controller,
  Post,
  Body,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

@Controller('api/chat')
export class AiController {
  constructor(
    private readonly aiService: AiService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('send')
  async chat(
    @Headers('x-user-id') userId: string,
    @Body() body: { content: string },
  ) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { insight: true, calibrationScore: true },
    });

    const currentScore: number = Number(user?.calibrationScore ?? 0);
    const userInsight: string = user?.insight ?? '';

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'user', content: body.content },
    ];

    const aiResult = await this.aiService.getCoachResponse(
      userInsight,
      messages,
      currentScore,
    );

    const newScore: number = Math.min(
      100,
      currentScore + (aiResult.calibrationIncrement || 1),
    );

    await this.prisma.user.update({
      where: { id: userId },
      data: { calibrationScore: newScore },
    });

    return {
      reply: aiResult.reply,
      newScore: newScore,
    };
  }
}
