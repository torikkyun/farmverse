import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @MessagePattern('deposit')
  async handleDeposit(
    @Payload() data: { transactionId: string; userId: string; amount: number },
  ) {
    await this.transactionsService.handleDeposit(data);
  }

  @MessagePattern('contract')
  async handleContract(
    @Payload()
    data: {
      transactionId: string;
      userId: string;
      items: {
        itemId: string;
        quantity: number;
        includesIot: boolean;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
      }[];
      contractImage: Express.Multer.File;
    },
  ) {
    await this.transactionsService.handleContract(data);
  }
}
