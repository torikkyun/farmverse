import { BadGatewayException, Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionStatus } from 'generated/prisma';
import { BlockchainService } from 'src/providers/blockchain.service';
import { PrismaService } from 'src/providers/prisma.service';

@Controller()
export class QueueConsumer {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
  ) {}

  @MessagePattern('deposit')
  async handleDeposit(
    @Payload()
    {
      transactionId,
      userId,
      amount,
    }: {
      transactionId: string;
      userId: string;
      amount: number;
    },
  ) {
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

  @MessagePattern('contract')
  async handleContract(
    @Payload()
    {
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
    },
  ) {
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
