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
      select: { insight: true, facts: true },
    });

    if (!user) return;

    const synthesis = await this.aiService.updatePsychologicalInsight(
      user.insight,
      user.facts,
      newEntryContent,
    );

    if (!synthesis) return;

    let updatedFacts = user.facts || '';
    if (synthesis.new_facts && synthesis.new_facts.length > 0) {
      const formattedNewFacts = synthesis.new_facts
        .map((f) => `- ${f}`)
        .join('\n');
      updatedFacts = updatedFacts
        ? `${updatedFacts}\n${formattedNewFacts}`
        : formattedNewFacts;
    }

    if (synthesis.psychology !== user.insight || updatedFacts !== user.facts) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          insight: synthesis.psychology,
          facts: updatedFacts,
        },
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
