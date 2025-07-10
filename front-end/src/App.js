import React, { useState } from "react";
import { mintTree, getTreeMetadata } from "./utils/farmTreeNFT";
import { connectWallet } from "./utils/wallet";

function App() {
  const [metadata, setMetadata] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [result, setResult] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnectWallet = async () => {
    try {
      const signer = await connectWallet();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setResult("Kết nối ví thành công: " + address);
    } catch (err) {
      setWalletAddress("");
      setResult("Lỗi kết nối ví: " + err.message);
    }
  };

  const handleMint = async () => {
    try {
      const txHash = await mintTree(metadata);
      setResult("Mint thành công! Tx: " + txHash);
    } catch (err) {
      setResult("Lỗi: " + err.message);
    }
  };

  const handleGetMetadata = async () => {
    try {
      const data = await getTreeMetadata(tokenId);
      setResult("Metadata: " + data);
    } catch (err) {
      setResult("Lỗi: " + err.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleConnectWallet} style={{ marginBottom: 20 }}>Kết nối ví Metamask</button>
      <div>Ví: {walletAddress ? walletAddress : "Chưa kết nối"}</div>

      <h2>Mint NFT cây trồng</h2>
      <input value={metadata} onChange={e => setMetadata(e.target.value)} placeholder="Nhập metadata" />
      <button onClick={handleMint}>Mint NFT</button>

      <h2>Lấy metadata NFT</h2>
      <input value={tokenId} onChange={e => setTokenId(e.target.value)} placeholder="Nhập tokenId" />
      <button onClick={handleGetMetadata}>Lấy metadata</button>

      <div style={{ marginTop: 20 }}>{result}</div>
    </div>
  );
}

export default App;
