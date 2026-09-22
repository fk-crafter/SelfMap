import {
  Controller,
  Post,
  Body,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { auth, prisma } from './auth';
import { fromNodeHeaders } from 'better-auth/node';
import { AiService } from './ai/ai.service';

@Controller('users')
export class UserController {
  constructor(private readonly aiService: AiService) {}

  @Post('setup')
  async setupCoach(
    @Req() req: Request,
    @Body() body: { mbtiType: string; gender: string },
  ) {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      throw new UnauthorizedException('Unauthorized');
    }

    const userId = session.user.id;
    const { mbtiType, gender } = body;

    const profile = await this.aiService.generateInitialProfile(
      mbtiType,
      gender,
    );

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        type: mbtiType,
        gender: gender,
        insight: profile.insight,
        avatarSeed: profile.avatarUrl,
      },
    });

    return { user: updatedUser };
  }
}
