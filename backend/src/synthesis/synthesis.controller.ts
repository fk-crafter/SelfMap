import {
  Controller,
  Get,
  Post,
  Req,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import {
  SynthesisService,
  type ParsedWeeklySynthesis,
} from './synthesis.service';
import type { Request } from 'express';
import { auth } from '../auth';
import { fromNodeHeaders } from 'better-auth/node';

@Controller('api/synthesis')
export class SynthesisController {
  constructor(private readonly synthesisService: SynthesisService) {}

  private async getUserId(req: Request): Promise<string> {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    const userId = session?.user?.id || (req.headers['x-user-id'] as string);
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return userId;
  }

  @Get('current')
  async getCurrentSynthesis(
    @Req() req: Request,
    @Headers('x-user-lang') userLang: string = 'fr',
  ): Promise<ParsedWeeklySynthesis | null> {
    const userId = await this.getUserId(req);
    return this.synthesisService.getCurrentSynthesis(userId, userLang);
  }

  @Post('generate')
  async generateSynthesis(
    @Req() req: Request,
    @Headers('x-user-lang') userLang: string = 'fr',
  ): Promise<ParsedWeeklySynthesis | null> {
    const userId = await this.getUserId(req);
    return this.synthesisService.generateSynthesis(userId, userLang, true);
  }

  @Get('history')
  async getHistory(@Req() req: Request): Promise<ParsedWeeklySynthesis[]> {
    const userId = await this.getUserId(req);
    return this.synthesisService.getHistory(userId);
  }
}
