import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() body: { userId: string; currentPhaseId?: string }) {
    return this.sessionService.create(body.userId, body.currentPhaseId);
  }

  @Post('set-current-phase')
  async setCurrentPhase(@Body() body: { userId: string; phaseId: string }) {
    return await this.sessionService.setCurrentPhase(body.userId, body.phaseId);
  }

  @Get('current-phase/:userId')
  async getCurrentPhase(@Param('userId') userId: string) {
    return await this.sessionService.getCurrentPhaseByUser(userId);
  }

  @Get('levels')
  async getAllLevels() {
    return await this.sessionService.getAllLevels();
  }
}
