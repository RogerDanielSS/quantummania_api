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

  /**
   * Retorna um mapa de phaseId para currentPhaseId da sessão atual do usuário,
   * permitindo saber em que fase o usuário parou em cada level.
   */
  async getUserPhaseProgress(userId: string) {
    // Busca todas as sessões do usuário, ordenadas por atualização
    const sessions = await this.prisma.session.findMany({
      where: { userId },
      include: { currentPhase: true },
      orderBy: { updatedAt: 'desc' },
    });

    // Cria um mapa: levelId -> currentPhase
    const progress: Record<string, any> = {};
    for (const session of sessions) {
      if (session.currentPhase && session.currentPhase.levelId) {
        // Garante que só pega a última sessão para cada level
        if (!progress[session.currentPhase.levelId]) {
          progress[session.currentPhase.levelId] = session.currentPhase;
        }
      }
    }
    return progress;
  }

  /**
   * Salva o progresso do usuário em um level específico.
   * Se já existe uma sessão para o usuário e o level, atualiza a fase.
   * Caso contrário, cria uma nova sessão para esse level.
   */
  async setCurrentPhaseByLevel(
    userId: string,
    levelId: string,
    phaseId: string,
  ) {
    // Busca a sessão mais recente do usuário para o level informado
    const session = await this.prisma.session.findFirst({
      where: {
        userId,
        currentPhase: {
          levelId: levelId,
        },
      },
      include: { currentPhase: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (!session) {
      // Se não existir sessão para esse level, cria uma nova
      return await this.prisma.session.create({
        data: {
          userId,
          currentPhaseId: phaseId,
        },
      });
    }

    // Atualiza a sessão existente para esse level
    return await this.prisma.session.update({
      where: { id: session.id },
      data: { currentPhaseId: phaseId },
    });
  }
}
