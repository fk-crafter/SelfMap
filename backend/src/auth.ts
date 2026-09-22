import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3001/api/auth',
  trustedOrigins: ['http://localhost:3001', 'https://self-map-beta.vercel.app'],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  user: {
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      type: { type: 'string', required: false },
      insight: { type: 'string', required: false },
      avatarSeed: { type: 'string', required: false },
      scores: { type: 'string', required: false },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
    },
    onResponse: (response: Response, request: Request) => {
      if (request.url.includes('verify-email') && request.method === 'GET') {
        return new Response(
          `<html>
            <head><meta http-equiv="refresh" content="0;url=https://self-map-beta.vercel.app/login" /></head>
            <body style="background-color: #001809; color: #e9c349; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0;">
              <h2>Sanctuary Unlocked. Redirecting...</h2>
            </body>
          </html>`,
          {
            status: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
          },
        );
      }
      return response;
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail({ user, url }) {
      fetch(process.env.GOOGLE_WEBHOOK_URL as string, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: user.email,
          subject: 'Unlock your Sanctuary - Verify your email',
          html: `
            <div style="background-color: #001809; color: #c9ebd0; padding: 40px 20px; font-family: sans-serif; text-align: center;">
              <h1 style="color: #e9c349; font-family: serif; font-weight: normal;">Soul Coach</h1>
              <p>Welcome to your journey, ${user.name}.</p>
              <p>Please verify your email address to enter the sanctuary.</p>
              <a href="${url}" style="background-color: #e9c349; color: #001809; padding: 12px 24px; text-decoration: none; border-radius: 30px; display: inline-block; margin-top: 20px; font-weight: bold; font-size: 14px;">VERIFY MY EMAIL</a>
            </div>
          `,
        }),
      }).catch((err) => console.error('Webhook error:', err));

      return Promise.resolve();
    },
  },
});
