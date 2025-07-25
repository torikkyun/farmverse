import { Injectable } from '@nestjs/common';
import { TransactionStatus, TransactionType } from 'generated/prisma';
import { DepositDto } from './dto/deposit.dto';
import { plainToInstance } from 'class-transformer';
import { ContractDto } from './dto/contract.dto';
import { PrismaService } from '@app/providers/prisma.service';
import { QueueService } from '@app/providers/queue/queue.service';
import { TransactionResponseDto } from '@app/common/dto/response/transaction.dto';
import { UserResponseDto } from '@app/common/dto/response/user.dto';
import { FarmResponseDto } from '@app/common/dto/response/farm.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
  ) {}

  private toTransactionResponse(transaction: any): TransactionResponseDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userResponse = plainToInstance(UserResponseDto, transaction.user, {
      excludeExtraneousValues: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const farmResponse = plainToInstance(FarmResponseDto, transaction.farm, {
      excludeExtraneousValues: true,
    });

    const transactionResponse = plainToInstance(
      TransactionResponseDto,
      transaction,
      {
        excludeExtraneousValues: true,
      },
    );

    transactionResponse.user = userResponse;
    transactionResponse.farm = farmResponse;

    return transactionResponse;
  }

  async deposit(
    { id }: { id: string },
    { amount }: DepositDto,
  ): Promise<{
    message: string;
    transaction: TransactionResponseDto;
  }> {
    const transaction = await this.prisma.transaction.create({
      data: {
        type: TransactionType.DEPOSIT,
        status: TransactionStatus.PENDING,
        totalPrice: amount,
        userId: id,
        transactionHash: '',
        blockNumber: 0,
        fromAddress: '',
        toAddress: '',
      },
    });

    await this.queueService.deposit({
      transactionId: transaction.id,
      userId: id,
      amount,
    });

    return {
      message: 'Đang xỷ lý giao dịch nạp tiền',
      transaction: this.toTransactionResponse(transaction),
    };
  }

  async contract(
    { id }: { id: string },
    { items, totalPrice }: ContractDto,
  ): Promise<{
    message: string;
    transaction: TransactionResponseDto;
  }> {
    const transaction = await this.prisma.transaction.create({
      data: {
        type: TransactionType.CONTRACT,
        status: TransactionStatus.PENDING,
        totalPrice: totalPrice,
        userId: id,
        transactionHash: '',
        blockNumber: 0,
        fromAddress: '',
        toAddress: '',
      },
    });

    await this.queueService.contract({
      transactionId: transaction.id,
      userId: id,
      items,
    });

    return {
      message: 'Đang xỷ lý giao dịch hợp đồng',
      transaction: this.toTransactionResponse(transaction),
    };
  }

  async getAllTransactions({
    id,
  }: {
    id: string;
  }): Promise<{ message: string; transactions: TransactionResponseDto[] }> {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId: id },
      include: {
        user: true,
        farm: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const transactionResponses = transactions.map((transaction) =>
      this.toTransactionResponse(transaction),
    );

    return {
      message: 'Lấy danh sách giao dịch thành công',
      transactions: transactionResponses,
    };
  }
}
