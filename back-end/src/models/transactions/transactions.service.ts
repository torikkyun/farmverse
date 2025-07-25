import { BadGatewayException, Injectable } from '@nestjs/common';
import { TransactionStatus, TransactionType } from 'generated/prisma';
import { BlockchainService } from 'src/providers/blockchain.service';
import { PrismaService } from 'src/providers/prisma.service';
import { DepositDto } from './dto/deposit.dto';
import { plainToInstance } from 'class-transformer';
import { TransactionResponseDto } from 'src/common/dto/response/transaction.dto';
import { UserResponseDto } from 'src/common/dto/response/user.dto';
import { FarmResponseDto } from 'src/common/dto/response/farm.dto';
import { QueueProducer } from 'src/providers/queue/queue.producer';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
    private readonly queueProducer: QueueProducer,
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

    await this.queueProducer.deposit({
      transactionId: transaction.id,
      userId: id,
      amount,
    });

    return {
      message: 'Đang xỷ lý giao dịch nạp tiền',
      transaction: this.toTransactionResponse(transaction),
    };
  }
}
