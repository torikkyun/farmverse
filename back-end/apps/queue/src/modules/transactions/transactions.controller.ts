import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { ContractQueuePayload } from '@app/common/types/contract-payload.type';
import { ContractDto } from '@app/models/transactions/dto/create-contract.dto';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @MessagePattern('deposit')
  async handleDeposit(
    @Payload() data: { transactionId: string; userId: string; amount: number },
  ): Promise<void> {
    await this.transactionsService.handleDeposit(data);
  }

  @MessagePattern('contract')
  async handleContract(
    @Payload()
    data: {
      contractQueuePayload: ContractQueuePayload;
      contract: ContractDto;
    },
  ): Promise<void> {
    await Promise.all([
      this.transactionsService.handleContract(data.contractQueuePayload),
      this.transactionsService.generateContractDocument(
        data.contractQueuePayload.transactionId,
        data.contract,
      ),
    ]);
  }
}
