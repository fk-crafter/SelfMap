import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { auth, prisma } from '../auth';
import { fromNodeHeaders } from 'better-auth/node';
import { AiService } from '../ai/ai.service';

@Controller('users')
export class UserController {
  constructor(private readonly aiService: AiService) {}

  @Get('admin/list')
  async getAdminUsersList(@Req() req: Request) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true },
    });

    if (!currentUser?.isAdmin) {
      throw new UnauthorizedException('Forbidden: Admins only');
    }

    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        type: true,
        gender: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Post('setup')
  async setupCoach(
    @Req() req: Request,
    @Body() body: { mbtiType: string; gender?: string },
  ) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const userId = session.user.id;
    const { mbtiType, gender } = body;
    const userGender = gender || 'neutral';

    const profile = await this.aiService.generateInitialProfile(
      mbtiType,
      userGender,
    );

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        type: mbtiType,
        gender: userGender,
        insight: profile.insight,
        avatarSeed: profile.avatarUrl,
      },
    });

    return { user: updatedUser };
  }
}
