import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, currentPhaseId?: string) {
    return await this.prisma.session.create({
      data: {
        userId,
        currentPhaseId,
      },
    });
  }

  async updatePhase(sessionId: string, phaseId: string) {
    return await this.prisma.session.update({
      where: { id: sessionId },
      data: { currentPhaseId: phaseId },
    });
  }

  async getByUser(userId: string) {
    return await this.prisma.session.findMany({
      where: { userId },
      include: { currentPhase: true },
    });
  }
}
