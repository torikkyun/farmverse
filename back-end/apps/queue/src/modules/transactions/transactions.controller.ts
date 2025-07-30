import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './transactions.service';
import { ContractQueuePayload } from '@app/common/types/contract-payload.type';
import { GenerateContractImage } from '@app/common/types/generate-contract.type';

const sampleContractData = {
  lessorName: 'Nguyễn Văn A',
  lessorAddress: '123 Đường ABC, Quận 1, TP.HCM',
  lessorPhone: '0909123456',
  lessorEmail: 'a@farmverse.vn',
  lesseeName: 'Trần Thị B',
  lesseeAddress: '456 Đường XYZ, Quận 2, TP.HCM',
  lesseePhone: '0912345678',
  lesseeEmail: 'b@farmverse.vn',
  treeNames: ['Xoài', 'Bưởi'],
  totalTree: 10,
  farmAddress: 'Khu nông nghiệp công nghệ cao, TP.HCM',
  startDate: new Date('2025-08-01').toLocaleDateString('vi-VN'),
  endDate: new Date('2026-08-01').toLocaleDateString('vi-VN'),
  totalPrice: 5000,
  currentDate: '29',
  currentMonth: '07',
  currentYear: '2025',
};

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
      payload: ContractQueuePayload;
      contractImageData: GenerateContractImage;
    },
  ) {
    await Promise.all([
      this.transactionsService.handleContract(data.payload),
      this.transactionsService.generateContractDocument(
        data.payload.transactionId,
        data.contractImageData,
      ),
    ]);
  }
}
