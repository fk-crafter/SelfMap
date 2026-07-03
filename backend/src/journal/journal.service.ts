import { Injectable } from '@nestjs/common';
import { prisma } from '../auth';
import { AiService } from '../ai/ai.service';

@Injectable()
export class JournalService {
  constructor(private readonly aiService: AiService) {}

  async getEntries(userId: string) {
    return prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createEntry(userId: string, content: string) {
    const entry = await prisma.journalEntry.create({
      data: {
        userId,
        content,
      },
    });

    this.updateUserInsightAsync(userId, content).catch(console.error);

    return entry;
  }

  private async updateUserInsightAsync(
    userId: string,
    newEntryContent: string,
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { insight: true },
    });

    if (!user) return;

    const newInsight = await this.aiService.updatePsychologicalInsight(
      user.insight,
      newEntryContent,
    );

    if (newInsight && newInsight !== user.insight) {
      await prisma.user.update({
        where: { id: userId },
        data: { insight: newInsight },
      });
    }
  }

  async deleteEntry(id: string, userId: string) {
    const entry = await prisma.journalEntry.findUnique({ where: { id } });
    if (!entry || entry.userId !== userId) {
      throw new Error('Not allowed to delete this entry');
    }
    return prisma.journalEntry.delete({
      where: { id },
    });
  }
}
