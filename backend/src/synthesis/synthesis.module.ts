import { Module } from '@nestjs/common';
import { SynthesisController } from './synthesis.controller';
import { SynthesisService } from './synthesis.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AiService } from '../ai/ai.service';

@Module({
  imports: [PrismaModule],
  controllers: [SynthesisController],
  providers: [SynthesisService, AiService],
  exports: [SynthesisService],
})
export class SynthesisModule {}
