import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.login({
      email: body.email,
      password: body.password,
    });
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    await this.authService.sendPasswordResetEmail(email);
    return {
      message: 'Se o e-mail existir, um link de recuperação foi enviado.',
    };
  }

  @Post('reset-password')
  async resetPassword(
    @Body() { token, password }: { token: string; password: string },
  ) {
    const success = await this.authService.resetPassword(token, password);
    if (!success) throw new BadRequestException('Token inválido ou expirado');
    return { message: 'Senha redefinida com sucesso.' };
  }
}
