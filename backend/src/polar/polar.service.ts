import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Webhook } from 'standardwebhooks';

export interface PolarWebhookPayload {
  type: string;
  data: {
    id: string;
    status: string;
    customer_id?: string;
    customer?: {
      id?: string;
      email?: string;
      metadata?: Record<string, unknown>;
    };
    metadata?: {
      userId?: string;
      [key: string]: unknown;
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

    console.log(
      `[Polar Webhook] Received event: ${eventType} (ID: ${data.id})`,
    );

    if (
      eventType === 'subscription.created' ||
      eventType === 'subscription.updated'
    ) {
      const userId =
        data.metadata?.userId ||
        (data.customer?.metadata?.userId as string | undefined);
      const customerEmail = data.customer?.email?.toLowerCase().trim();

      console.log(
        `[Polar Webhook] Looking for user - userId: "${userId}", email: "${customerEmail}", customer_id: "${data.customer_id}"`,
      );

      // 1. Try finding user by userId if available in metadata
      let targetUser = userId
        ? await this.prisma.user.findUnique({ where: { id: userId } })
        : null;

      // 2. Fallback to matching customer email
      if (!targetUser && customerEmail) {
        targetUser = await this.prisma.user.findUnique({
          where: { email: customerEmail },
        });
      }

      // 3. Fallback to existing polarCustomerId
      if (!targetUser && data.customer_id) {
        targetUser = await this.prisma.user.findUnique({
          where: { polarCustomerId: data.customer_id },
        });
      }

      if (targetUser) {
        const isActive = data.status === 'active';
        const newPlan = isActive ? 'PRO' : 'FREE';

        await this.prisma.user.update({
          where: { id: targetUser.id },
          data: {
            plan: newPlan,
            polarCustomerId: data.customer_id || targetUser.polarCustomerId,
            polarSubscriptionId: data.id,
            subscriptionStatus: data.status,
          },
        });

        console.log(
          `[Polar Webhook] Successfully updated user ${targetUser.email} (${targetUser.id}) to plan: ${newPlan} (status: ${data.status})`,
        );
      } else {
        console.warn(
          `[Polar Webhook] No matching user found for subscription ${data.id} (email: ${customerEmail}, userId: ${userId})`,
        );
      }
    }

    if (
      eventType === 'subscription.canceled' ||
      eventType === 'subscription.revoked'
    ) {
      const customerEmail = data.customer?.email?.toLowerCase().trim();
      const polarCustId = data.customer_id;

      await this.prisma.user.updateMany({
        where: {
          OR: [
            { polarSubscriptionId: data.id },
            ...(polarCustId ? [{ polarCustomerId: polarCustId }] : []),
            ...(customerEmail ? [{ email: customerEmail }] : []),
          ],
        },
        data: {
          plan: 'FREE',
          subscriptionStatus: data.status,
        },
      });

      console.log(
        `[Polar Webhook] Canceled/revoked subscription ${data.id} for user(s)`,
      );
    }
  }
}
