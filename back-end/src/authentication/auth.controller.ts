import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LocalGuard } from 'src/common/guards/local.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { AccountVerificationDto } from './dto/account-verification.dto';

@Controller('api/auth')
@Public()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(
    @Body(new ValidationPipe()) loginDto: LoginDto,
  ): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body(new ValidationPipe()) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('verify-email')
  verifyEmail(
    @Body(new ValidationPipe()) accountVerificationDto: AccountVerificationDto,
  ) {
    return this.authService.verifyEmail(accountVerificationDto);
  }

  @Post('resend-verification-email')
  resendVerificationEmail(
    @Body(new ValidationPipe()) emailVerificationDto: EmailVerificationDto,
  ) {
    return this.authService.resendVerificationEmail(emailVerificationDto);
  }

  @Post('forgot-password')
  forgotPassword(
    @Body(new ValidationPipe()) emailVerificationDto: EmailVerificationDto,
  ) {
    return this.authService.forgotPassword(emailVerificationDto);
  }

  @Post('reset-password')
  resetPassword(
    @Body(new ValidationPipe()) resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('resend-reset-password')
  async resendResetPassword(
    @Body(new ValidationPipe()) emailVerificationDto: EmailVerificationDto,
  ) {
    return this.authService.resendResetPassword(emailVerificationDto);
  }
}
