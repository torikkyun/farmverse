// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract TreeRental {
  IERC20 public token;

  struct Rental {
    address renter;
    string ipfsHash;
  }

  Rental[] public rentals;

  event TreeRented(
    address indexed renter,
    uint256 indexed rentalId,
    string ipfsHash
  );
  event RentalCanceled(address indexed renter, uint256 indexed rentalId);

  constructor(address _token) {
    token = IERC20(_token);
  }

  function rentTree(string memory ipfsHash, uint256 rentAmount) external {
    require(
      token.transferFrom(msg.sender, address(this), rentAmount),
      'Payment failed'
    );

    rentals.push(Rental({renter: msg.sender, ipfsHash: ipfsHash}));
    emit TreeRented(msg.sender, rentals.length - 1, ipfsHash);
  }

  function getRental(uint256 rentalId) external view returns (Rental memory) {
    return rentals[rentalId];
  }

  function totalRentals() external view returns (uint256) {
    return rentals.length;
  }
}
