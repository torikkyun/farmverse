import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './authentication/auth.module';
import { MailProviderModule } from './providers/mail/mail.module';
import { FarmsModule } from './models/farms/farms.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards/jwt.guard';
import { ItemsModule } from './models/items/items.module';
import { SchedulesModule } from './models/schedules/schedules.module';
import { RolesGuard } from './common/guards/roles.guard';
import { TransactionsModule } from './models/transactions/transactions.module';
import { ItemInstancesModule } from './models/item-instances/item-instances.module';
import { IotDataModule } from './models/iot-data/iot-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
      expandVariables: true,
    }),
    AuthModule,
    MailProviderModule,
    UsersModule,
    FarmsModule,
    ItemsModule,
    SchedulesModule,
    ItemInstancesModule,
    TransactionsModule,
    IotDataModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
