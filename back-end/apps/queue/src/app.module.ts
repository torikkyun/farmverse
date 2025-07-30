import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
      expandVariables: true,
    }),
    TransactionsModule,
    MailModule,
  ],
})
export class AppModule {}
