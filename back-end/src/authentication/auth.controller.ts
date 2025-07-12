import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LocalGuard } from 'src/common/guards/local.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { AccountVerificationDto } from './dto/account-verification.dto';
import { U } from '@faker-js/faker/dist/airline-CLphikKp';
import { UserResponseDto } from 'src/common/dto/user-response.dto';

@Controller('api/auth')
@Public()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ): Promise<{ message: string; accessToken: string; user: UserResponseDto }> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body(new ValidationPipe()) registerDto: RegisterDto): Promise<{
    message: string;
    email: string;
  }> {
    return this.authService.register(registerDto);
  }

  @Get('verify-email')
  verifyEmail(
    @Body(new ValidationPipe()) accountVerificationDto: AccountVerificationDto,
  ): Promise<{
    message: string;
    email: string;
  }> {
    return this.authService.verifyEmail(accountVerificationDto);
  }

  @Post('resend-verification-email')
  resendVerificationEmail(
    @Body(new ValidationPipe()) emailVerificationDto: EmailVerificationDto,
  ): Promise<{
    message: string;
    email: string;
  }> {
    return this.authService.resendVerificationEmail(emailVerificationDto);
  }

  @Post('forgot-password')
  forgotPassword(
    @Body(new ValidationPipe()) emailVerificationDto: EmailVerificationDto,
  ): Promise<{
    message: string;
    email: string;
  }> {
    return this.authService.forgotPassword(emailVerificationDto);
  }

  @Post('reset-password')
  resetPassword(
    @Body(new ValidationPipe()) resetPasswordDto: ResetPasswordDto,
  ): Promise<{
    message: string;
    email: string;
  }> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('resend-reset-password')
  async resendResetPassword(
    @Body(new ValidationPipe()) emailVerificationDto: EmailVerificationDto,
  ): Promise<{
    message: string;
    email: string;
  }> {
    return this.authService.resendResetPassword(emailVerificationDto);
  }
}
