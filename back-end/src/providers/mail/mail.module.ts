import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const mailHost = configService.get<string>('MAIL_HOST');
        const mailPort = configService.get<number>('MAIL_PORT');
        const mailUser = configService.get<string>('MAIL_USER');
        const mailPass = configService.get<string>('MAIL_PASS');
        const mailFromName = configService.get<string>('MAIL_FROM_NAME');
        const mailFromEmail = configService.get<string>('MAIL_FROM_EMAIL');

        return {
          transport: {
            host: mailHost,
            port: mailPort,
            secure: false,
            auth: {
              user: mailUser,
              pass: mailPass,
            },
          },
          defaults: {
            from: `"${mailFromName}" <${mailFromEmail}>`,
          },
          template: {
            dir: join(__dirname, '..', '..', 'providers', 'mail', 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailProviderModule {}
