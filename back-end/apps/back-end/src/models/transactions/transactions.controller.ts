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
import { CreateContractDto } from './dto/create-contract.dto';
import { SearchTransactionsQueryDto } from './dto/search-transaction.dto';
import { TransactionBaseResponseDto } from '@app/common/dtos/response/transaction.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from '@app/common/pipes/file-validation.pipe';

@Controller('api/transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

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
  ): {
    message: string;
    signatureFileName: string;
    signatureHash: string;
  } {
    return this.transactionsService.uploadSignatureImage(signatureImage);
  }

  @Post('contract/confirm-payment')
  @ApiBearerAuth()
  async confirmPayment(
    @CurrentUser() user: { id: string },
    @Body() body: { transactionId: string; transactionHash: string },
  ): Promise<{ message: string }> {
    await this.transactionsService.confirmPayment(
      user,
      body.transactionId,
      body.transactionHash,
    );
    return { message: 'Xác nhận thanh toán thành công!' };
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
