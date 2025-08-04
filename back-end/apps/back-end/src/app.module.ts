import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './authentication/auth.module';
import { FarmsModule } from './models/farms/farms.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './common/guards/jwt.guard';
import { ItemsModule } from './models/items/items.module';
import { RolesGuard } from './common/guards/roles.guard';
import { SeedModule } from './seed/seed.module';
import { TransactionsModule } from './models/transactions/transactions.module';
import { RentedTreesModule } from './models/rented-trees/rented-trees.module';
import { InventoryModule } from './models/inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
      expandVariables: true,
    }),
    AuthModule,
    SeedModule,
    UsersModule,
    FarmsModule,
    ItemsModule,
    TransactionsModule,
    RentedTreesModule,
    InventoryModule,
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
