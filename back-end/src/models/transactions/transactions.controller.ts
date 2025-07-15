import { Body, Controller, Post } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/transactions')
@ApiTags('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  async deposit(@Body() body: { userId: string; amount: number }) {
    const result = await this.transactionsService.deposit(
      body.userId,
      body.amount,
    );
    return result;
  }
}
