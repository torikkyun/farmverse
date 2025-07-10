import { ethers } from "ethers";
import FarmTreeNFTABI from "../contracts/FarmTreeNFT.json";
import { connectWallet } from "./wallet";

const CONTRACT_ADDRESS = "0xYourContractAddress"; // Thay bằng địa chỉ thật

export async function mintTree(metadata) {
  const signer = await connectWallet();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, FarmTreeNFTABI.abi, signer);
  const tx = await contract.mint(signer.address, metadata);
  await tx.wait();
  return tx.hash;
}

export async function getTreeMetadata(tokenId) {
  const signer = await connectWallet();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, FarmTreeNFTABI.abi, signer);
  return await contract.getMetadata(tokenId);
}
