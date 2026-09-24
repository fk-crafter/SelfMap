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
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
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
      gender: { type: 'string', required: false },
      insight: { type: 'string', required: false },
      avatarSeed: { type: 'string', required: false },
      scores: { type: 'string', required: false },
      plan: { type: 'string', required: false, defaultValue: 'FREE' },
      isAdmin: { type: 'boolean', required: false, defaultValue: false },
    },
    changeEmail: { enabled: true },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'lax',
      secure: true,
      maxAge: 2592000,
      domain:
        process.env.NODE_ENV === 'production'
          ? 'self-map-beta.vercel.app'
          : undefined,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail({ user, url }) {
      const token = new URL(url).searchParams.get('token');
      const frontendVerifyUrl = `https://self-map-beta.vercel.app/verify?token=${token}`;

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
              <a href="${frontendVerifyUrl}" style="background-color: #e9c349; color: #001809; padding: 12px 24px; text-decoration: none; border-radius: 30px; display: inline-block; margin-top: 20px; font-weight: bold; font-size: 14px;">VERIFY MY EMAIL</a>
            </div>
          `,
        }),
      }).catch((err) => console.error('Webhook error:', err));

      return Promise.resolve();
    },
  },
});
