import { expect } from 'chai';
import hre from 'hardhat';

describe('TransactionLogger', function () {
  it('Should record and retrieve transactions', async function () {
    const [owner, user] = await hre.ethers.getSigners();
    const TransactionLogger = await hre.ethers.getContractFactory(
      'TransactionLogger',
    );
    const logger: any = await TransactionLogger.deploy();

    // Ghi một DEPOSIT transaction
    await logger.connect(user).recordTransaction(0, 1000);

    // Ghi một PURCHASE transaction
    await logger.connect(user).recordTransaction(1, 500);

    // Ghi một CONTRACT transaction
    await logger.connect(user).recordTransaction(2, 300);

    // Kiểm tra số lượng giao dịch đã ghi
    expect(await logger.getTransactionCount()).to.equal(3n);

    // Lấy giao dịch đầu tiên
    const tx1 = await logger.getTransaction(0);
    expect(tx1.user).to.equal(user.address);
    expect(tx1.txType).to.equal(0n);
    expect(tx1.amount).to.equal(1000n);

    // Lấy giao dịch thứ hai
    const tx2 = await logger.getTransaction(1);
    expect(tx2.txType).to.equal(1n);
    expect(tx2.amount).to.equal(500n);

    // Lấy giao dịch thứ ba
    const tx3 = await logger.getTransaction(2);
    expect(tx3.txType).to.equal(2n);
    expect(tx3.amount).to.equal(300n);
  });
});
