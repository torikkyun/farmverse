import { ContractQueuePayload } from '@app/common/types/contract-payload.type';
import { PrismaService } from '@app/providers/prisma.service';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { BlockchainService } from '@queue/providers/blockchain.service';
import {
  ItemType,
  statusRentedTree,
  TransactionStatus,
} from 'generated/prisma';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { GenerateContractImage } from '@app/common/types/generate-contract.type';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly blockchainService: BlockchainService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async handleDeposit({
    transactionId,
    userId,
    amount,
  }: {
    transactionId: string;
    userId: string;
    amount: number;
  }) {
    try {
      const { tx, receipt } =
        await this.blockchainService.recordDeposit(amount);

      if (!receipt || !tx.to) {
        throw new BadGatewayException(
          'Giao dịch không thành công, vui lòng thử lại sau',
        );
      }

      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: {
          totalPrice: amount,
          transactionHash: tx.hash,
          blockNumber: receipt.blockNumber,
          fromAddress: tx.from,
          toAddress: tx.to,
          status: TransactionStatus.SUCCESS,
          userId,
        },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: { fvtBalance: { increment: amount } },
      });
    } catch {
      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { status: 'FAILED' },
      });
    }
  }

  async handleContract({
    transactionId,
    userId,
    items,
    totalPrice,
    itemRecords,
    farmRecord,
  }: ContractQueuePayload) {
    try {
      const { tx, receipt } =
        await this.blockchainService.recordContract(totalPrice);

      if (!receipt || !tx.to) {
        throw new RpcException(
          'Giao dịch không thành công, vui lòng thử lại sau',
        );
      }

      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: {
          transactionHash: tx.hash,
          blockNumber: receipt.blockNumber,
          fromAddress: tx.from,
          toAddress: tx.to,
          status: TransactionStatus.SUCCESS,
        },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: { fvtBalance: { decrement: totalPrice } },
      });

      const detailsArr: {
        name: string;
        type: ItemType;
        description?: string;
        images: string[];
        price: number;
        quantity: number;
        details: Record<string, string | number>;
        iot: boolean;
        startDate: Date;
        endDate: Date;
      }[] = [];

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemRecord = itemRecords[i];

        await this.prisma.item.update({
          where: { id: item.itemId },
          data: { stock: { decrement: item.quantity } },
        });

        const rentedTreesData = Array.from({ length: item.quantity }).map(
          () => ({
            name: itemRecord.name,
            description: itemRecord.description ?? undefined,
            images: itemRecord.images,
            details: itemRecord.details ?? {},
            schedule: ((farmRecord?.schedule as any[]) ?? []).filter(
              (v) => v !== null,
            ),
            cameraUrl: null,
            status: statusRentedTree.GROWING,
            totalProfit: 0,
            harvest: [],
            startDate: item.startDate,
            endDate: item.endDate,
            farmId: itemRecord.farmId,
            userId,
          }),
        );

        await this.prisma.rentedTree.createMany({
          data: rentedTreesData,
        });

        detailsArr.push({
          name: itemRecord.name,
          type: itemRecord.type,
          description: itemRecord.description ?? undefined,
          images: itemRecord.images,
          price: itemRecord.price,
          details: (itemRecord.details ?? {}) as Record<string, any>,
          quantity: item.quantity,
          startDate: item.startDate,
          endDate: item.endDate,
          iot: item.includesIot,
        });
      }

      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: {
          details: detailsArr,
        },
      });
    } catch {
      await this.prisma.transaction.update({
        where: { id: transactionId },
        data: { status: 'FAILED' },
      });
    }
  }

  async generateContractDocument(
    transactionId: string,
    contractData: GenerateContractImage,
  ) {
    const templatePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'back-end',
      'apps',
      'queue',
      'src',
      'modules',
      'transactions',
      'templates',
      'contract.hbs',
    );
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = Handlebars.compile(templateSource);

    const html = template(contractData);

    const outputDir = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'back-end',
      'static',
      'contracts',
    );
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const pdfPath = path.join(outputDir, `${transactionId}.pdf`);
    const imgPath = path.join(outputDir, `${transactionId}.png`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // await page.pdf({ path: pdfPath, format: 'A4' });
    await page.screenshot({ path: imgPath as `${string}.png`, fullPage: true });

    await browser.close();

    await this.prisma.transaction.update({
      where: { id: transactionId },
      data: {
        contractImage: `${this.configService.get('STATIC_URL')}/contracts/${transactionId}.png`,
      },
    });

    return { pdfPath, imgPath };
  }

  // async purchaseItems(
  //   userId: string,
  //   transactionId: string,
  //   totalPrice: number,
  //   items: any,
  // ) {
  //   try {
  //     const { tx, receipt } =
  //       await this.blockchainService.recordPurchase(totalPrice);

  //     if (!receipt || !tx.to) {
  //       throw new RpcException(
  //         'Giao dịch không thành công, vui lòng thử lại sau',
  //       );
  //     }

  //     await this.prisma.transaction.update({
  //       where: { id: transactionId },
  //       data: {
  //         transactionHash: tx.hash,
  //         blockNumber: receipt.blockNumber,
  //         fromAddress: tx.from,
  //         toAddress: tx.to,
  //         status: TransactionStatus.SUCCESS,
  //       },
  //     });

  //     await this.prisma.user.update({
  //       where: { id: userId },
  //       data: { fvtBalance: { decrement: totalPrice } },
  //     });
  //   } catch {
  //     await this.prisma.transaction.update({
  //       where: { id: transactionId },
  //       data: { status: 'FAILED' },
  //     });
  //   }
  // }
}
