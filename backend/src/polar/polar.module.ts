import { Module } from '@nestjs/common';
import { PolarController } from './polar.controller';
import { PolarService } from './polar.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PolarController],
  providers: [PolarService],
})
export class PolarModule {}
