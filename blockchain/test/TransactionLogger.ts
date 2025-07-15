import { expect } from 'chai';
import hre from 'hardhat';

describe('TransactionLogger', function () {
  it('Should record and retrieve transactions', async function () {
    const [owner, user] = await hre.ethers.getSigners();
    const TransactionLogger = await hre.ethers.getContractFactory(
      'TransactionLogger',
    );
    const logger: any = await TransactionLogger.deploy();

    // Record a DEPOSIT transaction
    await logger.connect(user).recordTransaction(0, 1000); // 0 = DEPOSIT

    // Record a PURCHASE transaction
    await logger.connect(user).recordTransaction(1, 500); // 1 = PURCHASE

    // Check transaction count
    expect(await logger.getTransactionCount()).to.equal(2n);

    // Get first transaction
    const tx1 = await logger.getTransaction(0);
    expect(tx1.user).to.equal(user.address);
    expect(tx1.txType).to.equal(0n);
    expect(tx1.amount).to.equal(1000n);

    // Get second transaction
    const tx2 = await logger.getTransaction(1);
    expect(tx2.txType).to.equal(1n);
    expect(tx2.amount).to.equal(500n);
  });
});
