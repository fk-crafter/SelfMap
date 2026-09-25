import { Controller, Post, Req, Res } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request, Response } from 'express';
import { PolarService } from './polar.service';

@Controller('webhooks/polar')
export class PolarController {
  constructor(private readonly polarService: PolarService) {}

  @Post()
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    if (!req.rawBody) {
      return res.status(400).send('Missing raw body');
    }

    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return res.status(500).send('Webhook secret not configured');
    }

    try {
      const headers = {
        'webhook-id': req.headers['webhook-id'] as string,
        'webhook-timestamp': req.headers['webhook-timestamp'] as string,
        'webhook-signature': req.headers['webhook-signature'] as string,
      };

      await this.polarService.processWebhook(
        req.rawBody,
        headers,
        webhookSecret,
      );

      return res.status(200).send('Webhook processed');
    } catch (error: unknown) {
      console.error('[Polar Webhook Error]', error);
      return res.status(400).send('Webhook Error');
    }
  }
}
