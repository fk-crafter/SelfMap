import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { prisma } from '../auth';

@Controller('user')
export class UserController {
  constructor(private readonly aiService: AiService) {}

  @Post('setup')
  async setupUserProfile(
    @Body() body: { userId: string; mbtiType: string; gender?: string },
  ) {
    if (!body.userId || !body.mbtiType) {
      throw new HttpException(
        'Missing userId or mbtiType',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const userGender = body.gender || 'neutral';
      const { insight, avatarUrl } =
        await this.aiService.generateInitialProfile(body.mbtiType, userGender);

      await prisma.user.update({
        where: { id: body.userId },
        data: {
          insight: insight,
          avatarSeed: avatarUrl,
        },
      });

      return { success: true, avatarUrl, insight };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to setup user profile',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
