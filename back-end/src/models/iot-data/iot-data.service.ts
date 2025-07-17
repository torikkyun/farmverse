import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class IotDataService {
  constructor(private readonly prisma: PrismaService) {}
}
