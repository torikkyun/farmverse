import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { PurchaseItemsDto } from './dto/purchase-items.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly queueService: QueueService,
    private readonly configService: ConfigService,
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
  ): Promise<{
    message: string;
    transaction: TransactionResponseDto;
  }> {
    const itemRecords = await Promise.all(
      items.map((item) =>
        this.prisma.item.findUnique({ where: { id: item.itemId } }),
      ),
    );

    if (itemRecords.some((item) => !item)) {
      throw new BadRequestException(
        'Khi tạo hợp đồng, cây phải tồn tại. Vui lòng thử lại',
      );
    }

    const farmIds = itemRecords.map((item) => item!.farmId);
    const uniqueFarmIds = Array.from(new Set(farmIds));
    if (uniqueFarmIds.length !== 1) {
      throw new BadRequestException(
        'Tất cả mặt hàng phải thuộc cùng một nông trại',
      );
    }

    const farmRecord = await this.prisma.farm.findUnique({
      where: { id: uniqueFarmIds[0] },
    });

    if (!farmRecord) {
      throw new BadRequestException(
        'Trang trại không tồn tại, vui lòng thử lại sau',
      );
    }

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
        farmId: uniqueFarmIds[0],
      },
    });

    await this.queueService.contract({
      transactionId: transaction.id,
      userId: id,
      items,
      totalPrice,
      itemRecords,
      farmRecord,
    });

    return {
      message: 'Đang xỷ lý giao dịch hợp đồng',
      transaction: this.toTransactionResponse(transaction),
    };
  }

  async attachImageToContract(
    { id }: { id: string },
    contractId: string,
    contractImage: Express.Multer.File,
  ): Promise<{ message: string; transaction: TransactionResponseDto }> {
    const transaction = await this.prisma.transaction.update({
      where: { id: contractId, userId: id },
      data: {
        contractImage: `${this.configService.get('STATIC_URL')}/contracts/${contractImage.filename}`,
      },
      include: { user: true, farm: true },
    });

    if (!transaction) {
      throw new NotFoundException('Giao dịch không tồn tại');
    }

    return {
      message: 'Ảnh hợp đồng đã được đính kèm',
      transaction: this.toTransactionResponse(transaction),
    };
  }

  async purchaseItems(
    { id }: { id: string },
    { items, totalPrice }: PurchaseItemsDto,
  ): Promise<{
    message: string;
    transaction: TransactionResponseDto;
  }> {
    const transaction = await this.prisma.transaction.create({
      data: {
        type: TransactionType.PURCHASE,
        status: TransactionStatus.PENDING,
        totalPrice,
        userId: id,
        transactionHash: '',
        blockNumber: 0,
        fromAddress: '',
        toAddress: '',
        details: items as unknown as Prisma.InputJsonValue[],
      },
    });

    await this.queueService.purchaseItems({
      transactionId: transaction.id,
      userId: id,
      items,
      totalPrice,
    });

    return {
      message: 'Đang xỷ lý giao dịch mua hàng',
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

  async getTransactionById(
    { id }: { id: string },
    transactionId: string,
  ): Promise<{
    message: string;
    transaction: TransactionResponseDto;
  }> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId, userId: id },
      include: {
        user: true,
        farm: true,
      },
    });

    if (!transaction) {
      throw new Error('Giao dịch không tồn tại');
    }

    return {
      message: 'Lấy giao dịch thành công',
      transaction: this.toTransactionResponse(transaction),
    };
  }
}
