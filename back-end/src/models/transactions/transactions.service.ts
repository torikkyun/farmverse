import { BadGatewayException, Injectable } from '@nestjs/common';
import { TransactionType } from 'generated/prisma';
import { BlockchainService } from 'src/providers/blockchain.service';
import { PrismaService } from 'src/providers/prisma.service';
import { DepositDto } from './dto/deposit.dto';
import { TransactionResponseDto } from 'src/common/dto/transaction-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/common/dto/user-response.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
  ) {}

  private toTransactionResponse(transaction: any): TransactionResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const buyerResponse = plainToInstance(UserResponseDto, transaction.buyer, {
      excludeExtraneousValues: true,
    });

    const transactionResponse = plainToInstance(
      TransactionResponseDto,
      transaction,
      {
        excludeExtraneousValues: true,
      },
    );

    transactionResponse.buyer = buyerResponse;
    return transactionResponse;
  }

  async deposit(
    { id }: { id: string },
    { amount }: DepositDto,
  ): Promise<{
    message: string;
    transaction: TransactionResponseDto;
  }> {
    const tx = await this.blockchainService.recordDeposit(amount);
    const receipt = await tx.wait();

    if (!receipt) {
      throw new BadGatewayException(
        'Giao dịch không thành công, vui lòng thử lại sau',
      );
    }

    const [_updatedUser, transaction] = await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id },
        data: { fvtBalance: { increment: amount } },
      }),
      this.prisma.transaction.create({
        data: {
          transactionHash: tx.hash,
          blockNumber: receipt.blockNumber,
          toAddress: tx.to,
          fromAddress: tx.from,
          totalPrice: amount,
          buyerId: id,
          type: TransactionType.DEPOSIT,
        },
        include: {
          buyer: true,
        },
      }),
    ]);

    return {
      message: 'Nạp tiền thành công',
      transaction: this.toTransactionResponse(transaction),
    };
  }
}
