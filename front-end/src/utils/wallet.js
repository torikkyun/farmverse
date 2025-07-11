import { ethers } from "ethers";

export async function connectWallet() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return signer;
  } else {
    alert("Vui lòng cài Metamask!");
    throw new Error("Metamask not found");
  }
}
