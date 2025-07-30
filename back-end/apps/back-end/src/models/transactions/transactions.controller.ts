import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DepositDto } from './dto/deposit.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { SearchTransactionsQueryDto } from './dto/search-transaction.dto';
import { TransactionBaseResponseDto } from '@app/common/dto/response/transaction.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { PurchaseItemsDto } from './dto/purchase-items.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@app/common/pipes/file-validation.pipe';

@Controller('api/transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  @ApiBearerAuth()
  async deposit(
    @CurrentUser() user: { id: string },
    @Body() depositDto: DepositDto,
  ): Promise<{ message: string; transaction: TransactionBaseResponseDto }> {
    return await this.transactionsService.deposit(user, depositDto);
  }

  @Post('contract')
  @ApiBearerAuth()
  async createContract(
    @CurrentUser() user: { id: string },
    @Body() createContractDto: CreateContractDto,
  ): Promise<{ message: string; transaction: TransactionBaseResponseDto }> {
    return await this.transactionsService.contract(user, createContractDto);
  }

  @Post('contract/signature')
  @UseInterceptors(FileInterceptor('signatureImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        signatureImage: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['signatureImage'],
    },
  })
  uploadSignatureImage(
    @UploadedFile(new FileValidationPipe()) signatureImage: Express.Multer.File,
  ) {
    return this.transactionsService.uploadSignatureImage(signatureImage);
  }

  @Post('purchase-items')
  @ApiBearerAuth()
  async purchaseItems(
    @CurrentUser() user: { id: string },
    @Body() purchaseItemsDto: PurchaseItemsDto,
  ): Promise<{ message: string; transaction: TransactionBaseResponseDto }> {
    return await this.transactionsService.purchaseItems(user, purchaseItemsDto);
  }

  @Get()
  @ApiBearerAuth()
  async getAllTransactions(
    @CurrentUser() user: { id: string },
    @Query() searchTransactionsQueryDto: SearchTransactionsQueryDto,
  ): Promise<{ message: string; items: TransactionBaseResponseDto[] }> {
    return await this.transactionsService.getAllTransactions(
      user,
      searchTransactionsQueryDto,
    );
  }

  @Get('/:transactionId')
  @ApiBearerAuth()
  async getTransactionById(
    @CurrentUser() user: { id: string },
    @Param('transactionId') transactionId: string,
  ): Promise<{ message: string; transaction: TransactionBaseResponseDto }> {
    return await this.transactionsService.getTransactionById(
      user,
      transactionId,
    );
  }
}
