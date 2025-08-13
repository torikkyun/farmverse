import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ContractQueuePayload } from '@shared/types/contract-payload.type';
import { ContractDto } from '@shared/dtos/contract.dto';

@Injectable()
export class TransactionClientService {
  constructor(
    @Inject('FARMVERSE_QUEUE') private readonly client: ClientProxy,
  ) {}

  async contract(
    data: ContractQueuePayload,
    contract: ContractDto,
  ): Promise<void> {
    await lastValueFrom(
      this.client.emit('contract', {
        contractQueuePayload: data,
        contract,
      }),
    );
  }
}
