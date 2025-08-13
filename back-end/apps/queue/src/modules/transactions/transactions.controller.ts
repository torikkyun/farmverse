import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { ContractQueuePayload } from '@shared/types/contract-payload.type';
import { ContractDto } from '@shared/dtos/contract.dto';

@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

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
