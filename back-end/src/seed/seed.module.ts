import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { PrismaService } from 'src/providers/prisma.service';

@Module({
  providers: [PrismaService, SeedService],
})
export class SeedModule {}
