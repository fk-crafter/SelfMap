import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

export function getIsoWeekAndYear(date: Date = new Date()): {
  week: number;
  year: number;
} {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
  return { week: weekNo, year: d.getUTCFullYear() };
}

export interface ParsedWeeklySynthesis {
  id: string;
  userId: string;
  year: number;
  weekNumber: number;
  climate: string;
  themes: string[];
  analysis: string;
  intention: string;
  isPro: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface RawWeeklySynthesis {
  id: string;
  userId: string;
  year: number;
  weekNumber: number;
  climate: string;
  themes: string;
  analysis: string;
  intention: string;
  isPro: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class SynthesisService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  private parseSynthesis(
    s: RawWeeklySynthesis | null,
  ): ParsedWeeklySynthesis | null {
    if (!s) return null;
    let parsedThemes: string[] = [];
    try {
      const decoded = JSON.parse(s.themes) as unknown;
      if (Array.isArray(decoded)) {
        parsedThemes = decoded.filter(
          (t): t is string => typeof t === 'string',
        );
      } else if (typeof decoded === 'string') {
        parsedThemes = [decoded];
      }
    } catch {
      parsedThemes = s.themes ? [s.themes] : [];
    }
    return {
      ...s,
      themes: parsedThemes,
    };
  }

  async getCurrentSynthesis(
    userId: string,
    userLang: string = 'fr',
  ): Promise<ParsedWeeklySynthesis | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, type: true, plan: true, insight: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { week, year } = getIsoWeekAndYear();

    const existing = await this.prisma.weeklySynthesis.findUnique({
      where: {
        userId_year_weekNumber: {
          userId,
          year,
          weekNumber: week,
        },
      },
    });

    const isPro = user.plan === 'PRO' || user.plan === 'BETA';

    if (existing) {
      if (isPro && !existing.isPro) {
        return this.generateSynthesis(userId, userLang, true);
      }
      return this.parseSynthesis(existing);
    }

    return this.generateSynthesis(userId, userLang, false);
  }

  async generateSynthesis(
    userId: string,
    userLang: string = 'fr',
    force: boolean = false,
  ): Promise<ParsedWeeklySynthesis | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, type: true, plan: true, insight: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { week, year } = getIsoWeekAndYear();

    if (!force) {
      const existing = await this.prisma.weeklySynthesis.findUnique({
        where: {
          userId_year_weekNumber: {
            userId,
            year,
            weekNumber: week,
          },
        },
      });
      if (existing) {
        return this.parseSynthesis(existing);
      }
    }

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const journalEntries = await this.prisma.journalEntry.findMany({
      where: {
        userId,
        createdAt: { gte: sevenDaysAgo },
      },
      orderBy: { createdAt: 'asc' },
      take: 30,
      select: { content: true, createdAt: true },
    });

    const conversation = await this.prisma.conversation.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        messages: {
          where: { createdAt: { gte: sevenDaysAgo } },
          orderBy: { createdAt: 'asc' },
          take: 40,
          select: { content: true, role: true, createdAt: true },
        },
      },
    });

    const chatMessages = conversation?.messages || [];
    const isPro = user.plan === 'PRO' || user.plan === 'BETA';

    const aiResult = await this.aiService.generateWeeklySynthesis({
      userName: user.name,
      mbtiType: user.type,
      isPro,
      lang: userLang,
      userInsight: user.insight,
      journalEntries,
      chatMessages,
    });

    const saved = await this.prisma.weeklySynthesis.upsert({
      where: {
        userId_year_weekNumber: {
          userId,
          year,
          weekNumber: week,
        },
      },
      create: {
        userId,
        year,
        weekNumber: week,
        climate: aiResult.climate,
        themes: JSON.stringify(aiResult.themes),
        analysis: aiResult.analysis,
        intention: aiResult.intention,
        isPro,
      },
      update: {
        climate: aiResult.climate,
        themes: JSON.stringify(aiResult.themes),
        analysis: aiResult.analysis,
        intention: aiResult.intention,
        isPro,
      },
    });

    return this.parseSynthesis(saved);
  }

  async getHistory(userId: string): Promise<ParsedWeeklySynthesis[]> {
    const records = await this.prisma.weeklySynthesis.findMany({
      where: { userId },
      orderBy: [{ year: 'desc' }, { weekNumber: 'desc' }],
      take: 20,
    });

    const list = records.map((s) => this.parseSynthesis(s));
    return list.filter((s): s is ParsedWeeklySynthesis => s !== null);
  }
}
