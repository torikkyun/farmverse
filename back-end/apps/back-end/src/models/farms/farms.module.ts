import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '@app/providers/prisma.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: '../static/farms',
        filename: (_req, file, cb) => {
          const fileExtName = extname(file.originalname);
          const newFileName = `${uuidv4()}${fileExtName}`;
          cb(null, newFileName);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  ],
  controllers: [FarmsController],
  providers: [FarmsService, PrismaService],
})
export class FarmsModule {}
