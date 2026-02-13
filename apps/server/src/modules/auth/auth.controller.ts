import { Controller, Post, Body, UsePipes, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import {
  registerSchema,
  RegisterDto,
  loginSchema,
  LoginDto,
  refreshTokenSchema,
  RefreshTokenDto,
  forgotPasswordSchema,
  ForgotPasswordDto,
  resetPasswordSchema,
  ResetPasswordDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh-token')
  @UsePipes(new ZodValidationPipe(refreshTokenSchema))
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Post('logout')
  @UsePipes(new ZodValidationPipe(refreshTokenSchema))
  async logout(@Body() dto: RefreshTokenDto) {
    return this.authService.logout(dto.refreshToken);
  }

  @Post('forgot-password')
  @UsePipes(new ZodValidationPipe(forgotPasswordSchema))
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @UsePipes(new ZodValidationPipe(resetPasswordSchema))
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.token, dto.password);
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') _token: string) {
    // TODO: Implement email verification (Agent 6)
    return { message: 'Email verification not yet implemented' };
  }
}
