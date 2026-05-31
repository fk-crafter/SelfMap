import { Injectable } from '@nestjs/common';
import { prisma } from '../auth';

@Injectable()
export class ChatService {
  async getOrCreateConversation(userId: string) {
    let conversation = await prisma.conversation.findFirst({
      where: { userId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: { userId },
        include: { messages: true },
      });
    }

    return conversation;
  }

  async sendMessage(userId: string, content: string) {
    const conversation = await this.getOrCreateConversation(userId);

    await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content,
      },
    });

    const aiResponseContent =
      "Je suis ton coach IA. J'ai bien reçu ton message : " + content;

    const aiMessage = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: aiResponseContent,
      },
    });

    return aiMessage;
  }
}
