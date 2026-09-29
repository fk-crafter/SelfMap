import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { auth, prisma } from '../auth';
import { fromNodeHeaders } from 'better-auth/node';
import { AiService } from '../ai/ai.service';

@Controller('users')
export class UserController {
  constructor(private readonly aiService: AiService) {}

  @Get('me/subscription')
  async getMySubscription(@Req() req: Request) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        plan: true,
        subscriptionStatus: true,
        cancelAtPeriodEnd: true,
        currentPeriodEnd: true,
        polarCustomerId: true,
        polarSubscriptionId: true,
      },
    });

    return {
      plan: user?.plan || 'FREE',
      subscriptionStatus: user?.subscriptionStatus || null,
      cancelAtPeriodEnd: Boolean(user?.cancelAtPeriodEnd),
      currentPeriodEnd: user?.currentPeriodEnd || null,
    };
  }

  @Get('admin/list')
  async getAdminUsersList(@Req() req: Request) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
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

    if (!session) {
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
  @Post('admin/update-plan')
  async updateAdminUserPlan(
    @Req() req: Request,
    @Body() body: { targetUserId: string; newPlan: string },
  ) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new UnauthorizedException('Unauthorized');
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true },
    });

    if (!currentUser?.isAdmin) {
      throw new UnauthorizedException('Forbidden: Admins only');
    }

    const { targetUserId, newPlan } = body;

    const validPlans = ['FREE', 'BETA', 'PRO'];
    if (!validPlans.includes(newPlan.toUpperCase())) {
      throw new Error('Invalid plan selected');
    }

    const updatedUser = await prisma.user.update({
      where: { id: targetUserId },
      data: {
        plan: newPlan.toUpperCase(),
      },
    });

    return { success: true, user: updatedUser };
  }

  @Post('admin/delete-user')
  async deleteAdminUser(
    @Req() req: Request,
    @Body() body: { targetUserId: string },
  ) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      throw new UnauthorizedException('Unauthorized');
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isAdmin: true },
    });

    if (!currentUser?.isAdmin) {
      throw new UnauthorizedException('Forbidden: Admins only');
    }

    const { targetUserId } = body;

    if (!targetUserId) {
      throw new BadRequestException('ID utilisateur manquant');
    }

    if (targetUserId === session.user.id) {
      throw new BadRequestException(
        'Impossible de supprimer votre propre compte administrateur.',
      );
    }

    const userToDelete = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, email: true, name: true },
    });

    if (!userToDelete) {
      throw new NotFoundException(
        'Utilisateur introuvable dans la base de données',
      );
    }

    await prisma.user.delete({
      where: { id: targetUserId },
    });

    return {
      success: true,
      message: `Utilisateur ${userToDelete.name} (${userToDelete.email}) supprimé avec succès`,
    };
  }
}
