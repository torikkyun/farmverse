"use client";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { Badge } from "@/components/ui/badge";

const FVT_ADDRESS = process.env.NEXT_PUBLIC_FVT_ADDRESS as `0x${string}`;
const FVT_ABI = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
];

function shortenAddress(address?: string, chars = 4) {
  if (!address) return "";
  return `${address.slice(0, 2 + chars)}...${address.slice(-chars)}`;
}

export default function WalletInfo() {
  const { address, isConnected } = useAccount();
  const { data: decimals } = useReadContract({
    address: FVT_ADDRESS,
    abi: FVT_ABI,
    functionName: "decimals",
    query: { enabled: isConnected },
  });
  const { data: balance, isLoading } = useReadContract({
    address: FVT_ADDRESS,
    abi: FVT_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  });

  if (!isConnected) return null;

  return (
    <div className="flex flex-col items-end mr-2">
      <Badge variant="secondary" className="truncate max-w-[140px] mb-1">
        {shortenAddress(address)}
      </Badge>
      <span className="text-xs text-muted-foreground">
        FVT:{" "}
        {isLoading
          ? "Đang tải..."
          : typeof balance === "bigint" && typeof decimals === "number"
          ? formatUnits(balance, decimals)
          : "0"}
      </span>
    </div>
  );
}
