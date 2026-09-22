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

  async sendMessage(userId: string, content: string, userLang: string = 'en') {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        insight: true,
        facts: true,
        calibrationScore: true,
        plan: true,
      },
    });

    const currentScore: number = Number(user?.calibrationScore ?? 0);
    const userPlan = user?.plan || 'FREE';

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const dailyMessageCount = await this.prisma.message.count({
      where: {
        conversation: { userId },
        role: 'user',
        createdAt: { gte: startOfDay },
      },
    });

    const LIMITS = {
      FREE: 15,
      BETA: 50,
      PRO: 500,
    };
    const dailyLimit = LIMITS[userPlan as keyof typeof LIMITS] || 15;

    if (dailyMessageCount >= dailyLimit) {
      const isFr = userLang.toLowerCase().includes('fr');

      let limitMessage = '';
      if (userPlan === 'FREE') {
        limitMessage = isFr
          ? 'Le coach est entré en méditation profonde pour assimiler notre échange. Veuillez revenir demain, ou débloquez le Sanctuaire pour une guidance illimitée.'
          : 'The coach has entered a deep state of meditation to process our exchange. Please return tomorrow, or unlock the Sanctuary for unlimited guidance.';
      } else {
        limitMessage = isFr
          ? "Le coach doit se reposer pour aujourd'hui. Veuillez revenir demain."
          : 'The coach needs to rest for today. Please return tomorrow.';
      }

      return {
        role: 'assistant',
        content: limitMessage,
        newScore: currentScore,
      };
    }

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
      take: 8,
    });

    const chatHistory: OpenAI.Chat.ChatCompletionMessageParam[] = recentMessages
      .reverse()
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

    const aiResponseContent = await this.aiService.getCoachResponse(
      user?.insight || '',
      user?.facts || '',
      chatHistory,
    );

    const increment = aiResponseContent.calibrationIncrement ?? 0;
    const newScore: number = Math.min(100, currentScore + increment);

    await this.prisma.user.update({
      where: { id: userId },
      data: { calibrationScore: newScore },
    });

    let finalReply =
      aiResponseContent.reply || 'The coach meditates in silence...';

    if (aiResponseContent.status === 'warning') {
      const isFr = userLang.toLowerCase().includes('fr');
      finalReply = isFr
        ? 'Je ressens une perturbation. Mon rôle est de guider ton esprit, pas de répondre à ce type de requête. Recentrons-nous sur ton évolution.'
        : 'I sense a disturbance. My purpose is to guide your mind, not to process such requests. Let us refocus on your journey.';
    }

    const aiMessage = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: finalReply,
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
        user?.facts || null,
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
    currentFacts: string | null,
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

      const synthesis = await this.aiService.updatePsychologicalInsight(
        currentInsight,
        currentFacts,
        `Recent conversation excerpt:\n${dialogue}`,
      );

      if (!synthesis) return;

      console.log('--- [SOUL COACH] NEW SYNTHESIS GENERATED ---');
      console.log(synthesis);
      console.log('--------------------------------------------');

      let updatedFacts = currentFacts || '';
      if (synthesis.new_facts && synthesis.new_facts.length > 0) {
        const formattedNewFacts = synthesis.new_facts
          .map((f) => `- ${f}`)
          .join('\n');
        updatedFacts = updatedFacts
          ? `${updatedFacts}\n${formattedNewFacts}`
          : formattedNewFacts;
      }

      if (
        synthesis.psychology !== currentInsight ||
        updatedFacts !== currentFacts
      ) {
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            insight: synthesis.psychology,
            facts: updatedFacts,
          },
        });
      }
    } catch (error) {
      const err = error as Error;
      console.error('Failed to update insight in background:', err.message);
    }
  }
}
