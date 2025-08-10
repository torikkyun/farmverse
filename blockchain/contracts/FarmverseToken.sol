// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract FarmverseToken is ERC20 {
  constructor() ERC20('Farmverse Token', 'FVT') {
    _mint(msg.sender, 1_000_000 * 10 ** decimals());
  }

  function faucet() external {
    _mint(msg.sender, 1000 * 10 ** decimals());
  }

  receive() external payable {}

  function withdrawETH() external {
    payable(msg.sender).transfer(address(this).balance);
  }

  function swapETHForFVT() external payable {
    require(msg.value > 0, 'Phai gui mot luong ETH');
    uint256 rate = 100_000;
    uint256 amountFVT = msg.value * rate;
    _mint(msg.sender, amountFVT);
  }
}
