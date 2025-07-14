// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FarmverseToken is ERC20 {
  constructor(uint256 initialSupply) ERC20('Farmverse Token', 'FVT') {
    _mint(msg.sender, initialSupply);
  }

  event TokenTransferred(
    address indexed from,
    address indexed to,
    uint256 amount,
    uint256 timestamp
  );

  function transfer(address to, uint256 amount) public override returns (bool) {
    bool success = super.transfer(to, amount);
    if (success) {
      emit TokenTransferred(msg.sender, to, amount, block.timestamp);
    }
    return success;
  }
}
