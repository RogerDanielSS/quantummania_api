import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  private UnauthorizedExceptionMessage = 'Usuário ou senha inválidos';

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user)
      throw new UnauthorizedException(this.UnauthorizedExceptionMessage);

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid)
      throw new UnauthorizedException(this.UnauthorizedExceptionMessage);

    const { password: _, ...result } = user;
    return result;
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.validateUser(email, password);

    if (!user)
      throw new UnauthorizedException(this.UnauthorizedExceptionMessage);
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async sendPasswordResetEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return;

    const token = randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    await this.prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: expires,
      },
    });

    const resetLink = `http://localhost:3000/auth/reset-password?token=${token}`;
    await this.mailService.sendMail(
      email,
      'Recuperação de senha',
      `Clique no link para redefinir sua senha: ${resetLink}`,
      `<p>Clique no link para redefinir sua senha: <a href="${resetLink}">${resetLink}</a></p>`,
    );

    return { token, resetLink };
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const reset = await this.prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    const now = await this.prisma.$queryRawUnsafe<Date>('SELECT NOW()');
    const currentDate = Array.isArray(now) ? now[0] : now;

    if (!reset || reset.expiresAt < currentDate) return false;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: reset.userId },
      data: { password: hashedPassword },
    });

    await this.prisma.passwordResetToken.delete({ where: { token } });
    return true;
  }
}
