import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepositDto } from './dto/deposit.dto';
import { ContractDto } from './dto/contract.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TransactionResponseDto } from '../../common/dto/response/transaction.dto';

@Controller('api/transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  @ApiBearerAuth()
  async deposit(
    @CurrentUser() user: { id: string },
    @Body() depositDto: DepositDto,
  ) {
    return await this.transactionsService.deposit(user, depositDto);
  }

  @Post('contract')
  @ApiBearerAuth()
  async createContract(
    @CurrentUser() user: { id: string },
    @Body() contractDto: ContractDto,
  ) {
    return await this.transactionsService.contract(user, contractDto);
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
  ): Promise<{ message: string; transactions: TransactionResponseDto[] }> {
    return await this.transactionsService.getAllTransactions(user);
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
