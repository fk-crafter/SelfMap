import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { NotificationsService, PushSubscriptionDto } from './notifications.service';
import type { Request } from 'express';
import { auth } from '../auth';
import { fromNodeHeaders } from 'better-auth/node';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

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

  @Get('public-key')
  getPublicKey() {
    return {
      publicKey: this.notificationsService.getPublicKey(),
    };
  }

  @Get('status')
  async getStatus(@Req() req: Request) {
    const userId = await this.getUserId(req);
    return this.notificationsService.getStatus(userId);
  }

  @Post('subscribe')
  async subscribe(@Req() req: Request, @Body() body: PushSubscriptionDto) {
    const userId = await this.getUserId(req);
    return this.notificationsService.subscribe(userId, body);
  }

  @Post('unsubscribe')
  async unsubscribe(@Req() req: Request, @Body('endpoint') endpoint: string) {
    const userId = await this.getUserId(req);
    return this.notificationsService.unsubscribe(userId, endpoint);
  }

  @Post('test')
  async sendTest(
    @Req() req: Request,
    @Headers('x-user-lang') userLang: string = 'fr',
  ) {
    const userId = await this.getUserId(req);
    return this.notificationsService.sendTestNotification(userId, userLang);
  }
}
