import { Injectable } from '@nestjs/common';
import { BlockchainService } from 'src/providers/blockchain.service';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
  ) {}

  async deposit(userId: string, amount: number) {
    const tx = await this.blockchainService.recordDeposit(amount);

    await this.prisma.user.update({
      where: { id: userId },
      data: { fvtBalance: { increment: amount } },
    });

    // const transaction = await this.prisma.transaction.create({
    //   data: {
    //     itemId: undefined,
    //     totalPrice: amount,
    //     transactionHash: tx.hash,
    //     blockNumber: tx.blockNumber,
    //     toAddress: tx.to,
    //     fromAddress: tx.from,
    //     buyerId: userId,
    //     userId: userId,
    //     type: 'DEPOSIT',
    //   },
    // });

    return {
      transactionHash: tx.hash,
      blockNumber: tx.blockNumber,
      // transaction,
    };
  }
}
