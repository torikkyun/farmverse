// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract TransactionLogger {
  enum TransactionType {
    DEPOSIT,
    PURCHASE,
    CONTRACT
  }

  struct Transaction {
    address user;
    TransactionType txType;
    uint256 amount;
    uint256 timestamp;
  }

  Transaction[] public transactions;

  event TransactionRecorded(
    address indexed user,
    TransactionType txType,
    uint256 amount,
    uint256 timestamp
  );

  function recordTransaction(TransactionType txType, uint256 amount) external {
    Transaction memory txData = Transaction({
      user: msg.sender,
      txType: txType,
      amount: amount,
      timestamp: block.timestamp
    });

    transactions.push(txData);
    emit TransactionRecorded(msg.sender, txType, amount, block.timestamp);
  }

  function getTransactionCount() external view returns (uint256) {
    return transactions.length;
  }

  function getTransaction(
    uint256 index
  )
    external
    view
    returns (
      address user,
      TransactionType txType,
      uint256 amount,
      uint256 timestamp
    )
  {
    Transaction memory txData = transactions[index];
    return (txData.user, txData.txType, txData.amount, txData.timestamp);
  }
}
