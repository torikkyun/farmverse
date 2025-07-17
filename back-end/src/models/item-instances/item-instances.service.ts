import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ItemInstanceResponseDto } from 'src/common/dto/item-instance-response.dto';
import { PrismaService } from 'src/providers/prisma.service';
import { ItemResponseDto } from 'src/common/dto/item-response.dto';
import { FarmResponseDto } from 'src/common/dto/farm-response.dto';

@Injectable()
export class ItemInstancesService {
  constructor(private readonly prisma: PrismaService) {}

  toItemInstanceResponse(itemInstance: any): ItemInstanceResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const itemResponse = plainToInstance(ItemResponseDto, itemInstance.item, {
      excludeExtraneousValues: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const farmResponse = plainToInstance(FarmResponseDto, itemInstance.farm, {
      excludeExtraneousValues: true,
    });

    const itemInstanceResponse = plainToInstance(
      ItemInstanceResponseDto,
      itemInstance,
      {
        excludeExtraneousValues: true,
      },
    );

    itemInstanceResponse.item = itemResponse;
    itemInstanceResponse.farm = farmResponse;

    return itemInstanceResponse;
  }

  async findAll(user: { id: string }) {
    const itemInstances = await this.prisma.itemInstance.findMany({
      where: {
        userId: user.id,
      },
      include: {
        item: true,
      },
    });

    return itemInstances.map((itemInstance) =>
      this.toItemInstanceResponse(itemInstance),
    );
  }

  async findOne({ id }: { id: string }, itemInstanceId: string) {
    const itemInstance = await this.prisma.itemInstance.findUnique({
      where: {
        id: itemInstanceId,
        userId: id,
      },
      include: {
        item: true,
        farm: true,
      },
    });

    if (!itemInstance) {
      throw new NotFoundException('Không tìm thấy vật phẩm');
    }

    return this.toItemInstanceResponse(itemInstance);
  }
}
