import { BlockchainService } from '@app/providers/blockchain.service';
import { PrismaService } from '@app/providers/prisma.service';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { TransactionStatus } from 'generated/prisma';

@Injectable()
export class QueueService {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
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
  }: {
    transactionId: string;
    userId: string;
    items: {
      itemId: string;
      quantity: number;
      includesIot?: boolean;
      startDate: Date;
      endDate: Date;
      totalPrice: number;
    }[];
  }) {
    try {
      const { tx, receipt } = await this.blockchainService.recordContract(
        items.reduce((acc, item) => acc + item.totalPrice, 0),
      );

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
          userId,
        },
      });

      for (const item of items) {
        await this.prisma.item.update({
          where: { id: item.itemId },
          data: { stock: { decrement: item.quantity } },
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
