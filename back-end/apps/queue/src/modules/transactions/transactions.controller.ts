import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { ContractQueuePayload } from '@app/common/types/contract-payload.type';

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
  async handleContract(@Payload() data: ContractQueuePayload) {
    await this.transactionsService.handleContract(data);
  }
}
