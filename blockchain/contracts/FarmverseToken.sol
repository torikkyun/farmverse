// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FarmverseToken is ERC20 {
  constructor() ERC20('Farmverse Token', 'FVT') {
    _mint(msg.sender, 1_000_000 * 10 ** decimals());
  }
}
