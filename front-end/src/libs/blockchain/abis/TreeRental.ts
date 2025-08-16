export const TREE_RENTAL_ABI = [
  {
    inputs: [
      { internalType: "string", name: "ipfsHash", type: "string" },
      { internalType: "uint256", name: "rentAmount", type: "uint256" },
    ],
    name: "rentTree",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "rentalId", type: "uint256" }],
    name: "getRental",
    outputs: [
      {
        components: [
          { internalType: "address", name: "renter", type: "address" },
          { internalType: "string", name: "ipfsHash", type: "string" },
        ],
        internalType: "struct TreeRental.Rental",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalRentals",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "renter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "rentalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ipfsHash",
        type: "string",
      },
    ],
    name: "TreeRented",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "renter",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "rentalId",
        type: "uint256",
      },
    ],
    name: "RentalCanceled",
    type: "event",
  },
];
