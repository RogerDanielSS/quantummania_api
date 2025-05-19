import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './database/prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [UserModule, AuthModule, SessionModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
