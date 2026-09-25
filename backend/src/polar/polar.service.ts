import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Webhook } from 'standardwebhooks';

export interface PolarWebhookPayload {
  type: string;
  data: {
    id: string;
    status: string;
    customer_id: string;
    metadata?: {
      userId?: string;
    };
  };
}

@Injectable()
export class PolarService {
  constructor(private readonly prisma: PrismaService) {}

  async processWebhook(
    payloadBuffer: Buffer,
    signatureHeaders: Record<string, string>,
    secret: string,
  ) {
    const wh = new Webhook(secret);

    const webhookPayload = wh.verify(
      payloadBuffer.toString('utf8'),
      signatureHeaders,
    ) as PolarWebhookPayload;

    const eventType = webhookPayload.type;
    const data = webhookPayload.data;

    if (
      eventType === 'subscription.created' ||
      eventType === 'subscription.updated'
    ) {
      const userId = data.metadata?.userId;

      if (userId) {
        const isActive = data.status === 'active';
        await this.prisma.user.update({
          where: { id: userId },
          data: {
            plan: isActive ? 'PRO' : 'FREE',
            polarCustomerId: data.customer_id,
            polarSubscriptionId: data.id,
            subscriptionStatus: data.status,
          },
        });
      }
    }

    if (
      eventType === 'subscription.canceled' ||
      eventType === 'subscription.revoked'
    ) {
      await this.prisma.user.updateMany({
        where: { polarSubscriptionId: data.id },
        data: {
          plan: 'FREE',
          subscriptionStatus: data.status,
        },
      });
    }
  }
}
