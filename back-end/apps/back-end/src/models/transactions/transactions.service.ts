import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, TransactionStatus, TransactionType } from 'generated/prisma';
import { plainToInstance } from 'class-transformer';
import { CreateContractDto } from './dto/create-contract.dto';
import { PrismaService } from '@shared/providers/prisma.service';
import {
  TransactionBaseResponseDto,
  TransactionResponseDto,
} from '@app/common/dtos/response/transaction.dto';
import { UserResponseDto } from '@app/common/dtos/response/user.dto';
import { FarmResponseDto } from '@app/common/dtos/response/farm.dto';
import { SearchTransactionsQueryDto } from './dto/search-transaction.dto';
import {
  PaginationMetaDto,
  PaginationResponseDto,
} from '@app/common/dtos/pagination.dto';
import { TransactionClientService } from '@app/providers/queue/services/transaction-client.service';
import * as crypto from 'crypto';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionClientService: TransactionClientService,
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

  async contract(
    { id }: { id: string },
    { items, contract }: CreateContractDto,
  ): Promise<{
    message: string;
    transaction: TransactionResponseDto;
  }> {
    const userRecord = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userRecord) {
      throw new BadRequestException(
        'Người dùng không tồn tại, vui lòng thử lại sau',
      );
    }

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
      include: { user: true },
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
        totalPrice: contract.totalPrice,
        userId: id,
        transactionHash: '',
        blockNumber: 0,
        fromAddress: '',
        toAddress: '',
        farmId: uniqueFarmIds[0],
      },
    });

    // await this.transactionClientService.contract(
    //   {
    //     transactionId: transaction.id,
    //     userId: id,
    //     items,
    //     totalPrice: contract.totalPrice,
    //     itemRecords: itemRecords.filter((item) => item !== null),
    //     farmRecord,
    //     startDate: contract.startDate,
    //     endDate: contract.endDate,
    //   },
    //   contract,
    // );

    return {
      message: 'Tạo hợp đồng thành công, vui lòng thanh toán FVT',
      transaction: this.toTransactionResponse(transaction),
    };
  }

  uploadSignatureImage(signatureImage: Express.Multer.File): {
    message: string;
    signatureFileName: string;
    signatureHash: string;
  } {
    const fileBuffer = fs.readFileSync(signatureImage.path);
    const signatureHash = crypto
      .createHash('sha256')
      .update(fileBuffer)
      .digest('hex');

    return {
      message: 'Tải lên chữ ký thành công',
      signatureFileName: signatureImage.filename,
      signatureHash,
    };
  }

  async confirmPayment(
    { id }: { id: string },
    transactionId: string,
    transactionHash: string,
  ): Promise<void> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId, userId: id },
    });

    if (!transaction) {
      throw new NotFoundException('Giao dịch không tìm thấy');
    }

    await this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: TransactionStatus.SUCCESS,
        transactionHash,
      },
    });
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
