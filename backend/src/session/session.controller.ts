import { Controller, Post, Patch, Body, Param } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  create(@Body() body: { userId: string; currentPhaseId?: string }) {
    return this.sessionService.create(body.userId, body.currentPhaseId);
  }

  @Patch(':id/phase')
  updatePhase(
    @Param('id') sessionId: string,
    @Body('phaseId') phaseId: string,
  ) {
    return this.sessionService.updatePhase(sessionId, phaseId);
  }
}
