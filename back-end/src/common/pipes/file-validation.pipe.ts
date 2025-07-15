import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Chỉ chấp nhận file ảnh jpg, jpeg, png');
    }

    const fiveMb = 5 * 1024 * 1024;

    if (file.size > fiveMb) {
      throw new BadRequestException('Kích thước file tối đa là 5MB');
    }

    return file;
  }
}
