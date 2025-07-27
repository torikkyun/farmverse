import { PrismaService } from '@app/providers/prisma.service';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockchainService } from '@queue/providers/blockchain.service';
import { statusRentedTree, TransactionStatus } from 'generated/prisma';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async handleDeposit({
    transactionId,
    userId,
    amount,
  }: {
    transactionId: string;
    userId: string;
    amount: number;
  }) {
    try {
      const { tx, receipt } =
        await this.blockchainService.recordDeposit(amount);

      if (!receipt || !tx.to) {
        throw new BadGatewayException(
          'Giao dịch không thành công, vui lòng thử lại sau',
        );
      }

      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: {
          totalPrice: amount,
          transactionHash: tx.hash,
          blockNumber: receipt.blockNumber,
          fromAddress: tx.from,
          toAddress: tx.to,
          status: TransactionStatus.SUCCESS,
          userId,
        },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: { fvtBalance: { increment: amount } },
      });
    } catch {
      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { status: 'FAILED' },
      });
    }
  }

  async handleContract({
    transactionId,
    userId,
    items,
    contractImage,
  }: {
    transactionId: string;
    userId: string;
    items: {
      itemId: string;
      quantity: number;
      includesIot: boolean;
      startDate: Date;
      endDate: Date;
      totalPrice: number;
    }[];
    contractImage: Express.Multer.File;
  }) {
    try {
      const totalPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);

      const { tx, receipt } =
        await this.blockchainService.recordContract(totalPrice);

      if (!receipt || !tx.to) {
        throw new BadGatewayException(
          'Giao dịch không thành công, vui lòng thử lại sau',
        );
      }

      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: {
          transactionHash: tx.hash,
          blockNumber: receipt.blockNumber,
          fromAddress: tx.from,
          toAddress: tx.to,
          status: TransactionStatus.SUCCESS,
          contractImage: `${this.configService.get('BACKEND_URL')}/static/contracts/${contractImage.filename}`,
          userId,
        },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: { fvtBalance: { decrement: totalPrice } },
      });

      for (const item of items) {
        const itemRecord = await this.prisma.item.findUnique({
          where: { id: item.itemId },
        });

        if (!itemRecord) {
          throw new BadGatewayException(
            'Mặt hàng không tồn tại, vui lòng thử lại sau',
          );
        }

        const farmRecord = await this.prisma.farm.findUnique({
          where: { id: itemRecord.farmId },
        });

        if (!farmRecord) {
          throw new BadGatewayException(
            'Trang trại không tồn tại, vui lòng thử lại sau',
          );
        }

        await this.prisma.item.update({
          where: { id: item.itemId },
          data: { stock: { decrement: item.quantity } },
        });

        const rentedTreesData = Array.from({ length: item.quantity }).map(
          () => ({
            name: itemRecord.name,
            description: itemRecord.description,
            images: itemRecord.images,
            details: itemRecord.details ?? {},
            schedule: Array.isArray(farmRecord.schedule)
              ? (farmRecord.schedule as any[]).filter((v) => v !== null)
              : [],
            cameraUrl: null,
            status: statusRentedTree.GROWING,
            totalProfit: 0,
            harvest: [],
            startDate: item.startDate,
            endDate: item.endDate,
            farmId: itemRecord.farmId,
            userId,
          }),
        );

        await this.prisma.rentedTree.createMany({
          data: rentedTreesData,
        });
      }
    } catch {
      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { status: 'FAILED' },
      });
    }
  }
}
