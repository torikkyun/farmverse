// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract TreeRental {
  IERC20 public token;

  struct Rental {
    address renter;
    uint256 treeId;
    uint256 startTime;
    uint256 endTime;
    uint256 cost;
    bool canceled;
  }

  Rental[] public rentals;

  constructor(address _token) {
    token = IERC20(_token);
  }

  function rentTree(uint256 treeId, uint256 costPerYear) external {
    uint256 duration = 365 days;
    require(
      token.transferFrom(msg.sender, address(this), costPerYear),
      'Payment failed'
    );

    rentals.push(
      Rental(
        msg.sender,
        treeId,
        block.timestamp,
        block.timestamp + duration,
        costPerYear,
        false
      )
    );
  }

  function cancel(uint256 rentalId) external {
    Rental storage rental = rentals[rentalId];
    require(msg.sender == rental.renter, 'Not your rental');
    require(block.timestamp < rental.endTime, 'Already expired');

    rental.canceled = true;
  }
}
