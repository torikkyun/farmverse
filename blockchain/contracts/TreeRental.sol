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
    string contractHash;
  }

  Rental[] public rentals;

  constructor(address _token) {
    token = IERC20(_token);
  }

  function rentTree(
    uint256 treeId,
    uint256 costPerYear,
    string memory contractHash
  ) external {
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
        false,
        contractHash
      )
    );
    emit TreeRented(msg.sender, treeId, rentals.length - 1, contractHash);
  }

  function cancel(uint256 rentalId) external {
    Rental storage rental = rentals[rentalId];
    require(msg.sender == rental.renter, 'Not your rental');
    require(block.timestamp < rental.endTime, 'Already expired');

    rental.canceled = true;
  }

  event TreeRented(
    address indexed renter,
    uint256 indexed treeId,
    uint256 rentalId,
    string contractHash
  );
  event RentalCanceled(address indexed renter, uint256 indexed rentalId);
}
