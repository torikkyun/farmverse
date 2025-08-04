import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaService } from '@shared/providers/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { QueueModule } from '@app/providers/queue/queue.module';

@Module({
  imports: [
    QueueModule,
    MulterModule.register({
      storage: diskStorage({
        destination: '../static/signatures',
        filename: (_req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const newFileName = `${uuidv4()}${fileExtName}`;
          cb(null, newFileName);
        },
      }),
      limits: { fileSize: 1 * 1024 * 1024 },
    }),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, PrismaService],
})
export class TransactionsModule {}
