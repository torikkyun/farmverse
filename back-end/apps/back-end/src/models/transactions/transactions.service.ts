import { Injectable } from '@nestjs/common';
import { Prisma, TransactionStatus, TransactionType } from 'generated/prisma';
import { DepositDto } from './dto/deposit.dto';
import { plainToInstance } from 'class-transformer';
import { ContractDto } from './dto/contract.dto';
import { PrismaService } from '@app/providers/prisma.service';
import { QueueService } from '@app/providers/queue/queue.service';
import {
  TransactionBaseResponseDto,
  TransactionResponseDto,
} from '@app/common/dto/response/transaction.dto';
import { UserResponseDto } from '@app/common/dto/response/user.dto';
import { FarmResponseDto } from '@app/common/dto/response/farm.dto';
import { SearchTransactionsQueryDto } from './dto/search-transaction.dto';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from '@app/common/dto/pagination.dto';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
  ) {}

  private toTransactionBaseResponse(
    transaction: any,
  ): TransactionBaseResponseDto {
    return plainToInstance(TransactionBaseResponseDto, transaction, {
      excludeExtraneousValues: true,
    });
  }

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
    contractImage: Express.Multer.File,
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
      contractImage,
    });

    return {
      message: 'Đang xỷ lý giao dịch hợp đồng',
      transaction: this.toTransactionResponse(transaction),
    };
  }

  async getAllTransactions(
    { id }: { id: string },
    { page, pageSize, type }: SearchTransactionsQueryDto,
  ): Promise<{ message: string; items: TransactionBaseResponseDto[] }> {
    const skip = (page - 1) * pageSize;
    const where: Prisma.TransactionWhereInput = {
      userId: id,
    };

    if (type) {
      where.type = type;
    }

    const [transactions, totalItems] = await Promise.all([
      this.prisma.transaction.findMany({
        where,
        include: {
          user: true,
          farm: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.prisma.transaction.count({ where }),
    ]);

    const meta = new PaginationMetaDto(page, pageSize, totalItems);

    const items = transactions.map((transaction) => {
      return this.toTransactionBaseResponse(transaction);
    });

    return {
      message: 'Lấy danh sách giao dịch thành công',
      ...new PaginationResponseDto(items, meta),
    };
  }
}
