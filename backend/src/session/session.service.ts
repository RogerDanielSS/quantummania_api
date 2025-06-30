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

  async getCurrentPhaseByUser(userId: string) {
    const session = await this.prisma.session.findFirst({
      where: { userId },
      include: { currentPhase: true },
      orderBy: { updatedAt: 'desc' },
    });
    return session?.currentPhase || null;
  }

  async setCurrentPhase(userId: string, phaseId: string) {
    // Busca a sessão mais recente do usuário
    const session = await this.prisma.session.findFirst({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });

    if (!session) {
      // Se não existir sessão, cria uma nova
      return await this.prisma.session.create({
        data: {
          userId,
          currentPhaseId: phaseId,
        },
      });
    }

    // Atualiza a sessão existente
    return await this.prisma.session.update({
      where: { id: session.id },
      data: { currentPhaseId: phaseId },
    });
  }

  async getAllLevels() {
    return await this.prisma.level.findMany({
      include: {
        phases: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
