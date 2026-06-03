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
}
