import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private loggerContract: ethers.Contract;

  constructor(private readonly configService: ConfigService) {
    const infuraKey = this.configService.get<string>('INFURA_RPC_KEY')!;
    const metamaskPrivateKey = this.configService.get<string>(
      'METAMASK_WALLET_PRIVATE_KEY',
    )!;
    const transactionLoggerAddress = this.configService.get<string>(
      'TRANSACTION_LOGGER_ADDRESS',
    )!;

    this.provider = new ethers.JsonRpcProvider(
      `https://sepolia.infura.io/v3/${infuraKey}`,
    )!;

    this.wallet = new ethers.Wallet(metamaskPrivateKey, this.provider);

    this.loggerContract = new ethers.Contract(
      transactionLoggerAddress,
      ['function recordTransaction(uint8 txType, uint256 amount) external'],
      this.wallet,
    );
  }

  async recordDeposit(amount: number) {
    const tx = (await this.loggerContract.recordTransaction(
      0,
      amount,
    )) as ethers.ContractTransactionResponse;
    const receipt = await tx.wait();
    return {
      tx,
      receipt,
    };
  }

  async recordPurchase(amount: number) {
    const tx = (await this.loggerContract.recordTransaction(
      1,
      amount,
    )) as ethers.ContractTransactionResponse;
    const receipt = await tx.wait();
    return {
      tx,
      receipt,
    };
  }

  async recordContract(amount: number) {
    const tx = (await this.loggerContract.recordTransaction(
      2,
      amount,
    )) as ethers.ContractTransactionResponse;
    const receipt = await tx.wait();
    return {
      tx,
      receipt,
    };
  }
}
