import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';
import type { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });

  app.set('trust proxy', 1);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://self-map-beta.vercel.app',
    ],
    credentials: true,
  });

  app.use('/api/auth', toNodeHandler(auth));

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
void bootstrap();
