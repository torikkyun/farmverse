import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PrismaService } from '@app/providers/prisma.service';

@Module({
  providers: [PrismaService, SeedService],
})
export class SeedModule {}
