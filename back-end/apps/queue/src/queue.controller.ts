import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QueueService } from './queue.service';

@Controller()
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @MessagePattern('deposit')
  async handleDeposit(
    @Payload() data: { transactionId: string; userId: string; amount: number },
  ) {
    await this.queueService.handleDeposit(data);
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
        includesIot?: boolean;
        startDate: Date;
        endDate: Date;
        totalPrice: number;
      }[];
    },
  ) {
    await this.queueService.handleContract(data);
  }
}
