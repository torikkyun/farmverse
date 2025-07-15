import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TransactionLoggerModule', (m) => {
  const transactionLogger = m.contract('TransactionLogger');
  return { transactionLogger };
});
