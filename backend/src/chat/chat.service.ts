import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async getHistory(userId: string) {
    let conversation = await this.prisma.conversation.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: { userId },
        include: { messages: true },
      });
    }

    return conversation.messages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));
  }

  async sendMessage(userId: string, content: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { insight: true, calibrationScore: true },
    });

    const currentScore: number = Number(user?.calibrationScore ?? 0);

    let conversation = await this.prisma.conversation.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: { userId },
      });
    }

    await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content,
      },
    });

    const recentMessages = await this.prisma.message.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const chatHistory: OpenAI.Chat.ChatCompletionMessageParam[] = recentMessages
      .reverse()
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    const aiResponseContent = await this.aiService.getCoachResponse(
      user?.insight || '',
      chatHistory,
    );

    const increment = aiResponseContent.calibrationIncrement ?? 0;
    const newScore: number = Math.min(100, currentScore + increment);

    await this.prisma.user.update({
      where: { id: userId },
      data: { calibrationScore: newScore },
    });

    const aiMessage = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: aiResponseContent.reply || 'The coach meditates in silence...',
      },
    });

    const messageCount = await this.prisma.message.count({
      where: { conversationId: conversation.id },
    });

    if (messageCount > 0 && messageCount % 10 === 0) {
      void this.synthesizeContextInBackground(
        userId,
        conversation.id,
        user?.insight || null,
      );
    }

    return {
      role: aiMessage.role,
      content: aiMessage.content,
      newScore: newScore,
    };
  }

  private async synthesizeContextInBackground(
    userId: string,
    conversationId: string,
    currentInsight: string | null,
  ) {
    try {
      const recentMessages = await this.prisma.message.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });

      const dialogue = recentMessages
        .reverse()
        .map((m) => `${m.role === 'user' ? 'User' : 'Coach'}: ${m.content}`)
        .join('\n');

      console.log('--- [SOUL COACH] STARTING BACKGROUND SYNTHESIS ---');

      const newInsight = await this.aiService.updatePsychologicalInsight(
        currentInsight,
        `Recent conversation excerpt:\n${dialogue}`,
      );

      console.log('--- [SOUL COACH] NEW INSIGHT GENERATED ---');
      console.log(newInsight);
      console.log('--------------------------------------------');

      if (newInsight && newInsight !== currentInsight) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { insight: newInsight },
        });
      }
    } catch (error) {
      console.error('Failed to update insight in background:', error);
    }
  }
}
