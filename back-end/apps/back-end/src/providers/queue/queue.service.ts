import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { ContractQueuePayload } from '@app/common/types/contract-payload.type';
import { GenerateContractImage } from '@app/common/types/generate-contract.type';

@Injectable()
export class QueueService implements OnModuleInit {
  client: ClientProxy;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBITMQ_URL')!],
        queue: 'farmverse_queue',
        queueOptions: { durable: true },
      },
    });
  }
  private formatAddress(address: {
    houseNumber?: string;
    street?: string;
    ward?: string;
    commune?: string;
    province?: string;
    city?: string;
    country?: string;
  }): string {
    if (!address || typeof address !== 'object') return '';

    const fields = [
      address.houseNumber,
      address.street,
      address.ward,
      address.commune,
      address.province,
      address.city,
      address.country,
    ];

    return fields.filter(Boolean).join(', ');
  }

  async deposit(data: {
    transactionId: string;
    userId: string;
    amount: number;
  }) {
    await lastValueFrom(this.client.emit('deposit', data));
  }

  async contract(data: ContractQueuePayload) {
    const lessorAddressObj =
      typeof data.farmRecord.address === 'object' &&
      data.farmRecord.address !== null &&
      !Array.isArray(data.farmRecord.address)
        ? data.farmRecord.address
        : {};

    const lesseeAddressObj =
      typeof data.userRecord?.address === 'object' &&
      data.userRecord?.address !== null &&
      !Array.isArray(data.userRecord.address)
        ? data.userRecord.address
        : {};

    const contractImageData: GenerateContractImage = {
      lessorName: data.farmRecord.name,
      lessorAddress: this.formatAddress(lessorAddressObj),
      lessorEmail: data.farmRecord.user.email,
      lesseeName: data.userRecord?.name,
      lesseeAddress: this.formatAddress(lesseeAddressObj),
      lesseeEmail: data.userRecord?.email,
      treeNames: data.itemRecords.map((item) => item.name),
      totalTree: data.items.reduce((sum, item) => sum + item.quantity, 0),
      farmAddress: this.formatAddress(lessorAddressObj),
      startDate: new Date(data.items[0].startDate).toLocaleDateString('vi-VN'),
      endDate: new Date(data.items[0].endDate).toLocaleDateString('vi-VN'),
      totalPrice: data.totalPrice,
      currentDate: new Date().getDate().toString(),
      currentMonth: (new Date().getMonth() + 1).toString(),
      currentYear: new Date().getFullYear().toString(),
    };

    await lastValueFrom(
      this.client.emit('contract', {
        payload: data,
        contractImageData,
      }),
    );
  }

  async purchaseItems(data: {
    transactionId: string;
    userId: string;
    items: any[];
    totalPrice: number;
  }) {
    await lastValueFrom(this.client.emit('purchase_items', data));
  }
}
