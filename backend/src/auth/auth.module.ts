import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'sua_chave_secreta', // Idealmente use process.env.JWT_SECRET
      signOptions: { expiresIn: '1d' },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
