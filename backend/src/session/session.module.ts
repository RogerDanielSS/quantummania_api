import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { PrismaService } from '../database/prisma/prisma.service';

@Module({
  providers: [SessionService, PrismaService],
  controllers: [SessionController],
  exports: [SessionService],
})
export class SessionModule {}
