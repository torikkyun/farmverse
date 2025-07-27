import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { DepositDto } from './dto/deposit.dto';
import { ContractDto } from './dto/contract.dto';
import { SearchTransactionsQueryDto } from './dto/search-transaction.dto';
import { TransactionBaseResponseDto } from '@app/common/dto/response/transaction.dto';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('contractImage'))
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  async createContract(
    @CurrentUser() user: { id: string },
    @Body() contractDto: ContractDto,
    @UploadedFile() contractImage: Express.Multer.File,
  ): Promise<{ message: string; transaction: TransactionBaseResponseDto }> {
    return await this.transactionsService.contract(
      user,
      contractDto,
      contractImage,
    );
  }

  // @Post('purchase-items')
  // @ApiBearerAuth()
  // async purchaseItems(
  //   @CurrentUser() user: { id: string },
  //   @Body() purchaseItemsDto: PurchaseItemsDto,
  // ) {
  //   return await this.transactionsService.purchaseItems(user, purchaseItemsDto);
  // }

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

  // @Get('/:transactionId')
  // @ApiBearerAuth()
  // async getTransactionById(
  //   @CurrentUser() user: { id: string },
  //   @Param('transactionId') transactionId: string,
  // ) {
  //   return await this.transactionsService.getTransactionById(
  //     user,
  //     transactionId,
  //   );
  // }
}
