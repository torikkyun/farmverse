// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Marketplace {
  IERC20 public token;
  address public owner;

  struct Purchase {
    address buyer;
    string itemName;
    uint256 quantity;
    uint256 timestamp;
  }

  Purchase[] public purchases;

  constructor(address _token) {
    token = IERC20(_token);
    owner = msg.sender;
  }

  function buyItem(
    string memory item,
    uint256 quantity,
    uint256 pricePerItem
  ) external {
    uint256 total = quantity * pricePerItem;
    require(token.transferFrom(msg.sender, owner, total), 'Transfer failed');

    purchases.push(Purchase(msg.sender, item, quantity, block.timestamp));
  }
}
