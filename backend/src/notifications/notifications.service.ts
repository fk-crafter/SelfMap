import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as webpush from 'web-push';

export class PushSubscriptionKeysDto {
  p256dh: string;
  auth: string;
}

export class PushSubscriptionDto {
  endpoint: string;
  keys: PushSubscriptionKeysDto;
}

export interface PushPayload {
  title: string;
  body: string;
  url?: string;
  tag?: string;
}

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  private readonly publicKey =
    process.env.VAPID_PUBLIC_KEY ||
    'BCGVeRz4PdhxiI0AeQmaQknG1fEtJvCB6s1SzDaf6fGOxMyB-vKoFisS8czyFYijK8i7Y9GbQnFhPRokON3Tnes';

  private readonly privateKey =
    process.env.VAPID_PRIVATE_KEY || 'Hetq5ecIyk0W_ezrkQLQRFvlwfJtDGVyIcSux3i72hw';

  private readonly subject =
    process.env.VAPID_SUBJECT || 'mailto:contact@selfmap.app';

  constructor(private prisma: PrismaService) {
    try {
      webpush.setVapidDetails(this.subject, this.publicKey, this.privateKey);
      this.logger.log('VAPID details configured successfully');
    } catch (err) {
      this.logger.error('Failed to configure VAPID details', err);
    }
  }

  getPublicKey(): string {
    return this.publicKey;
  }

  async subscribe(userId: string, dto: PushSubscriptionDto) {
    if (!dto.endpoint || !dto.keys?.p256dh || !dto.keys?.auth) {
      throw new Error('Invalid subscription payload');
    }

    return this.prisma.pushSubscription.upsert({
      where: { endpoint: dto.endpoint },
      create: {
        userId,
        endpoint: dto.endpoint,
        p256dh: dto.keys.p256dh,
        auth: dto.keys.auth,
      },
      update: {
        userId,
        p256dh: dto.keys.p256dh,
        auth: dto.keys.auth,
      },
    });
  }

  async unsubscribe(userId: string, endpoint: string) {
    return this.prisma.pushSubscription.deleteMany({
      where: {
        userId,
        endpoint,
      },
    });
  }

  async getStatus(userId: string): Promise<{ subscribed: boolean; count: number }> {
    const count = await this.prisma.pushSubscription.count({
      where: { userId },
    });
    return {
      subscribed: count > 0,
      count,
    };
  }

  async sendToUser(userId: string, payload: PushPayload): Promise<{ success: number; failed: number }> {
    const subscriptions = await this.prisma.pushSubscription.findMany({
      where: { userId },
    });

    if (subscriptions.length === 0) {
      return { success: 0, failed: 0 };
    }

    let success = 0;
    let failed = 0;

    const notificationPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      url: payload.url || '/dashboard',
      tag: payload.tag || 'selfmap-notification',
      icon: '/logo.png',
      badge: '/favicon.ico',
    });

    for (const sub of subscriptions) {
      const pushConfig = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      try {
        await webpush.sendNotification(pushConfig, notificationPayload);
        success++;
      } catch (err: any) {
        this.logger.warn(`Push failed for endpoint ${sub.endpoint}: ${err.message}`);
        failed++;
        // If expired or gone (404 or 410), clean up stale subscription
        if (err.statusCode === 404 || err.statusCode === 410) {
          await this.prisma.pushSubscription.delete({
            where: { endpoint: sub.endpoint },
          }).catch(() => null);
        }
      }
    }

    return { success, failed };
  }

  async sendTestNotification(userId: string, userLang: string = 'fr') {
    const isFr = userLang.toLowerCase().startsWith('fr');
    const title = isFr ? 'Le Sanctuaire vous salue 🌿' : 'The Sanctuary greets you 🌿';
    const body = isFr
      ? 'Vos notifications sont parfaitement configurées. Votre Soul Coach veille sur votre parcours.'
      : 'Your notifications are properly configured. Your Soul Coach watches over your journey.';

    return this.sendToUser(userId, {
      title,
      body,
      url: '/journal',
    });
  }
}
