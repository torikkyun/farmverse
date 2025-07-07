import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  EmailVerificationDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('resend-verification-email')
  resendVerificationEmail(@Body() emailVerificationDto: EmailVerificationDto) {
    return this.authService.resendVerificationEmail(emailVerificationDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() emailVerificationDto: EmailVerificationDto) {
    return this.authService.forgotPassword(emailVerificationDto);
  }

  @Post('reset-password')
  resetPassword(
    @Query('token') token: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }

  @Post('resend-reset-password')
  async resendResetPassword(
    @Body() emailVerificationDto: EmailVerificationDto,
  ) {
    return this.authService.resendResetPassword(emailVerificationDto);
  }
}
