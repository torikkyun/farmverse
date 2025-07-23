// import {
//   BadGatewayException,
//   BadRequestException,
//   ConflictException,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import {
//   ItemType,
//   Prisma,
//   TransactionType,
//   TreeRootInstanceStatus,
// } from 'generated/prisma';
// import { BlockchainService } from 'src/providers/blockchain.service';
// import { PrismaService } from 'src/providers/prisma.service';
// import { DepositDto } from './dto/deposit.dto';
// import { TransactionResponseDto } from 'src/common/dto/transaction-response.dto';
// import { plainToInstance } from 'class-transformer';
// import { UserResponseDto } from 'src/common/dto/user-response.dto';
// import { PurchaseItemsDto } from './dto/purchase-items.dto';
// import { TransactionItemResponseDto } from 'src/common/dto/transaction-item-response.dto';
// import {
//   ContractTransactionReceipt,
//   ContractTransactionResponse,
// } from 'ethers';

// @Injectable()
// export class TransactionsService {
//   constructor(
//     private readonly blockchainService: BlockchainService,
//     private readonly prisma: PrismaService,
//   ) {}

//   private toTransactionResponse(transaction: any): TransactionResponseDto {
//     const buyerResponse = plainToInstance(UserResponseDto, transaction.buyer, {
//       excludeExtraneousValues: true,
//     });

//     const itemResponse = plainToInstance(
//       TransactionItemResponseDto,
//       transaction.item,
//       {
//         excludeExtraneousValues: true,
//       },
//     );

//     const transactionResponse = plainToInstance(
//       TransactionResponseDto,
//       transaction,
//       {
//         excludeExtraneousValues: true,
//       },
//     );

//     transactionResponse.buyer = buyerResponse;
//     // transactionResponse.item = itemResponse;

//     return transactionResponse;
//   }

//   async deposit(
//     { id }: { id: string },
//     { amount }: DepositDto,
//   ): Promise<{
//     message: string;
//     transaction: TransactionResponseDto;
//   }> {
//     const tx = await this.blockchainService.recordDeposit(amount);
//     const receipt = await tx.wait();

//     if (!receipt) {
//       throw new BadGatewayException(
//         'Giao dịch không thành công, vui lòng thử lại sau',
//       );
//     }

//     const [_updatedUser, transaction] = await this.prisma.$transaction([
//       this.prisma.user.update({
//         where: { id },
//         data: { fvtBalance: { increment: amount } },
//       }),
//       this.prisma.transaction.create({
//         data: {
//           transactionHash: tx.hash,
//           blockNumber: receipt.blockNumber,
//           toAddress: tx.to,
//           fromAddress: tx.from,
//           totalPrice: amount,
//           buyerId: id,
//           type: TransactionType.DEPOSIT,
//         },
//         include: {
//           buyer: true,
//           TransactionItem: { include: { item: true } },
//         },
//       }),
//     ]);

//     return {
//       message: 'Nạp tiền thành công',
//       transaction: this.toTransactionResponse(transaction),
//     };
//   }

//   async purchaseItems({ id }: { id: string }, { items }: PurchaseItemsDto) {
//     const itemIds = items.map((item) => item.itemId);

//     const itemRecords = await this.prisma.item.findMany({
//       where: {
//         id: { in: itemIds },
//       },
//       include: {
//         farm: true,
//       },
//     });

//     itemRecords.forEach((record) => {
//       if (record.type === ItemType.TREEROOT) {
//         const itemDto = items.find((i) => i.itemId === record.id);
//         if (!itemDto?.includesIot || !itemDto?.startDate || !itemDto?.endDate) {
//           throw new BadRequestException(
//             `Vật phẩm TREEROOT (${record.name}) phải có đủ includesIot, startDate và endDate`,
//           );
//         }
//       }
//     });

//     const foundIds = new Set(itemRecords.map((r) => r.id));
//     const notFoundIds = itemIds.filter((id) => !foundIds.has(id));
//     if (notFoundIds.length > 0) {
//       throw new NotFoundException(
//         `Không tìm thấy vật phẩm với ID: ${notFoundIds.join(', ')}`,
//       );
//     }

//     const farm = itemRecords[0].farm;

//     const allFromSameFarm = itemRecords.every(
//       (item) => item.farmId === farm.id,
//     );

//     if (!allFromSameFarm) {
//       throw new BadRequestException(
//         'Tất cả vật phẩm phải thuộc cùng một trang trại.',
//       );
//     }

//     if (id === farm.ownerId) {
//       throw new ConflictException(
//         'Bạn không thể mua vật phẩm từ chính trang trại của mình.',
//       );
//     }

//     const itemRecordMap = new Map(itemRecords.map((item) => [item.id, item]));

//     const totalPrice = items.reduce((sum, item) => {
//       const record = itemRecordMap.get(item.itemId);
//       if (!record || record.quantity < item.quantity) {
//         throw new BadRequestException(
//           `Vật phẩm '${record?.name ?? 'Không xác định'}' không đủ số lượng.`,
//         );
//       }
//       return sum + record.price * item.quantity;
//     }, 0);

//     const buyer = await this.prisma.user.findUnique({
//       where: { id },
//     });

//     if (!buyer) {
//       throw new NotFoundException('Người dùng không tồn tại');
//     }

//     if (buyer.fvtBalance < totalPrice) {
//       throw new ConflictException(
//         'Số dư FVT của bạn không đủ để thực hiện giao dịch này',
//       );
//     }

//     const transactionResult = await this.prisma.$transaction(
//       async (tx) => {
//         await tx.user.update({
//           where: { id },
//           data: { fvtBalance: { decrement: totalPrice } },
//         });

//         await tx.user.update({
//           where: { id: farm.ownerId },
//           data: { fvtBalance: { increment: totalPrice } },
//         });

//         const updatePromises = items.map((item) =>
//           tx.item.update({
//             where: { id: item.itemId },
//             data: { quantity: { decrement: item.quantity } },
//           }),
//         );

//         await Promise.all(updatePromises);

//         const newTransaction = await tx.transaction.create({
//           data: {
//             totalPrice,
//             type: TransactionType.PURCHASE,
//             buyerId: buyer.id,
//             farmId: farm.id,
//           },
//           include: { buyer: true },
//         });

//         const transactionItemsData = items.map((itemDto) => {
//           const record = itemRecordMap.get(itemDto.itemId);
//           if (!record) {
//             throw new NotFoundException(
//               `Vật phẩm với ID ${itemDto.itemId} không tồn tại`,
//             );
//           }

//           return {
//             transactionId: newTransaction.id,
//             itemId: itemDto.itemId,
//             quantity: itemDto.quantity,
//             price: record.price,
//             type: record.type,
//             includesIot: itemDto.includesIot || undefined,
//             name: record.name,
//             description: record.description,
//             images: record.images,
//             farmId: record.farmId,
//             startDate: itemDto.startDate || undefined,
//             endDate: itemDto.endDate || undefined,
//           };
//         });

//         await tx.transactionItem.createMany({ data: transactionItemsData });

//         const itemInstancesToCreate = items
//           .map((itemDto) => {
//             const record = itemRecordMap.get(itemDto.itemId);

//             if (!record || !record.id || !record.type) {
//               throw new BadRequestException(
//                 `Vật phẩm với ID ${itemDto.itemId} không hợp lệ để tạo instance`,
//               );
//             }

//             const quantity = itemDto.quantity;

//             const baseInstance = {
//               userId: buyer.id,
//               farmId: farm.id,
//               itemId: record.id,
//               type: record.type,
//               images: record.images,
//             };

//             if (record.type === ItemType.TREEROOT) {
//               return Array.from({ length: quantity }, () => ({
//                 ...baseInstance,
//                 status: TreeRootInstanceStatus.GROWING,
//                 startDate: itemDto.startDate || undefined,
//                 endDate: itemDto.endDate || undefined,
//               }));
//             }

//             return [
//               {
//                 ...baseInstance,
//                 quantity,
//               },
//             ];
//           })
//           .flat();

//         await tx.itemInstance.createMany({
//           data: itemInstancesToCreate as Prisma.ItemInstanceCreateManyInput[],
//         });

//         return newTransaction;
//       },
//       { timeout: 15000 },
//     );

//     let tx: ContractTransactionResponse,
//       receipt: ContractTransactionReceipt | null;
//     try {
//       tx = await this.blockchainService.recordDeposit(totalPrice);
//       receipt = await tx.wait();
//     } catch {
//       throw new BadGatewayException(
//         'Không thể ghi nhận giao dịch lên blockchain',
//       );
//     }

//     const transaction = await this.prisma.transaction.update({
//       where: { id: transactionResult.id },
//       data: {
//         transactionHash: tx.hash,
//         blockNumber: receipt?.blockNumber,
//         toAddress: tx.to,
//         fromAddress: tx.from,
//       },
//       include: {
//         buyer: true,
//         TransactionItem: { include: { item: true } },
//       },
//     });

//     return {
//       message: 'Mua vật phẩm thành công',
//       transaction: this.toTransactionResponse(transaction),
//     };
//   }

//   async getAllTransactions({ id }: { id: string }) {
//     const transactions = await this.prisma.transaction.findMany({
//       where: { buyerId: id },
//       orderBy: { createdAt: 'desc' },
//       include: { TransactionItem: { include: { item: true } } },
//     });

//     return {
//       message: 'Lấy lịch sử giao dịch thành công',
//       transactions: transactions.map((tx) => this.toTransactionResponse(tx)),
//     };
//   }

//   async getTransactionById(
//     { id }: { id: string },
//     transactionId: string,
//   ): Promise<TransactionResponseDto> {
//     const transaction = await this.prisma.transaction.findUnique({
//       where: { id: transactionId, buyerId: id },
//       include: {
//         buyer: true,
//         TransactionItem: { include: { item: true } },
//       },
//     });

//     if (!transaction) {
//       throw new NotFoundException('Giao dịch không tồn tại');
//     }

//     return this.toTransactionResponse(transaction);
//   }
// }
