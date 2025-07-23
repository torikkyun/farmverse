import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { EmailVerificationDto } from './dto/email-verification.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LocalGuard } from 'src/common/guards/local.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { AccountVerificationDto } from './dto/account-verification.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('api/auth')
@Public()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Body() loginDto: LoginDto): Promise<{
    message: string;
    accessToken: string;
    accessTokenExpiresIn: string;
    refreshToken: string;
    refreshTokenExpiresIn: string;
    user: UserResponseDto;
  }> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<{
    message: string;
    email: string;
  }> {
    return this.authService.register(registerDto);
  }

  // @Post('verify-email')
  // verifyEmail(@Body() accountVerificationDto: AccountVerificationDto): Promise<{
  //   message: string;
  //   email: string;
  // }> {
  //   return this.authService.verifyEmail(accountVerificationDto);
  // }

  // @Post('resend-verification-email')
  // resendVerificationEmail(
  //   @Body() emailVerificationDto: EmailVerificationDto,
  // ): Promise<{
  //   message: string;
  //   email: string;
  // }> {
  //   return this.authService.resendVerificationEmail(emailVerificationDto);
  // }

  // @Post('forgot-password')
  // forgotPassword(@Body() emailVerificationDto: EmailVerificationDto): Promise<{
  //   message: string;
  //   email: string;
  // }> {
  //   return this.authService.forgotPassword(emailVerificationDto);
  // }

  // @Post('reset-password')
  // resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<{
  //   message: string;
  //   email: string;
  // }> {
  //   return this.authService.resetPassword(resetPasswordDto);
  // }

  // @Post('resend-forgot-password')
  // resendForgotPassword(
  //   @Body() emailVerificationDto: EmailVerificationDto,
  // ): Promise<{
  //   message: string;
  //   email: string;
  // }> {
  //   return this.authService.resendForgotPassword(emailVerificationDto);
  // }

  // @Post('refresh-token')
  // refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<{
  //   accessToken: string;
  //   expiresIn: string;
  // }> {
  //   return this.authService.refreshToken(refreshTokenDto);
  // }
}
