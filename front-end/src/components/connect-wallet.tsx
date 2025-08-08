"use client";

import { formatUnits } from "viem";
import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi";
import { metaMask } from "wagmi/connectors";

const FVT_ADDRESS = "0xc422E96eF3422c781a395c5B808a50151D0bb18C";

const FVT_ABI = [
  {
    constant: true,
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

export default function ConnectWalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: decimals } = useReadContract({
    address: FVT_ADDRESS,
    abi: FVT_ABI,
    functionName: "decimals",
    query: { enabled: isConnected },
  });

  const { data: balance, isLoading: isBalanceLoading } = useReadContract({
    address: FVT_ADDRESS,
    abi: FVT_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  });

  if (isConnected)
    return (
      <div>
        <div className="mb-2">Đã kết nối: {address}</div>
        <div>
          FVT Balance:{" "}
          {isBalanceLoading
            ? "Đang tải..."
            : typeof balance === "bigint" && typeof decimals === "number"
            ? formatUnits(balance, decimals)
            : "0"}
        </div>
        <button onClick={() => disconnect()}>Ngắt kết nối</button>
      </div>
    );

  return (
    <button
      onClick={() => connect({ connector: metaMask() })}
      disabled={isPending}
    >
      {isPending ? "Đang kết nối..." : "Kết nối MetaMask"}
    </button>
  );
}
