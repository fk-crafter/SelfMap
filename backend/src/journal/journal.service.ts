import { Injectable } from '@nestjs/common';
import { prisma } from '../auth';

@Injectable()
export class JournalService {
  async getEntries(userId: string) {
    return prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createEntry(userId: string, content: string) {
    return prisma.journalEntry.create({
      data: {
        userId,
        content,
      },
    });
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
