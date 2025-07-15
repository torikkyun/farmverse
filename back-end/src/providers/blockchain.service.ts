import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class BlockchainService {
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private loggerContract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      `https://sepolia.infura.io/v3/${process.env.INFURA_RPC_KEY!}`,
    );

    this.wallet = new ethers.Wallet(
      process.env.METAMASK_WALLET_PRIVATE_KEY!,
      this.provider,
    );

    this.loggerContract = new ethers.Contract(
      process.env.TRANSACTION_LOGGER_ADDRESS!,
      ['function recordTransaction(uint8 txType, uint256 amount) external'],
      this.wallet,
    );
  }

  async recordDeposit(amount: number) {
    const tx = (await this.loggerContract.recordTransaction(
      0,
      amount,
    )) as ethers.ContractTransactionResponse;
    await tx.wait();
    return tx;
  }
}
