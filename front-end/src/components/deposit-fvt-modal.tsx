"use client";
import { useState, useMemo } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowDown } from "lucide-react";

const FVT_ADDRESS = process.env.NEXT_PUBLIC_FVT_ADDRESS as `0x${string}`;
const FVT_ABI = [
  {
    inputs: [],
    name: "swapETHForFVT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

const RATE = 100000; // 1 ETH = 100,000 FVT

export default function DepositFVTModal() {
  const [open, setOpen] = useState(false);
  const { isConnected } = useAccount();
  const [ethAmount, setEthAmount] = useState("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isSwapping, setIsSwapping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();

  const fvtAmount = useMemo(() => {
    const eth = Number(ethAmount);
    if (isNaN(eth) || eth <= 0) return "0";
    return (eth * RATE).toLocaleString();
  }, [ethAmount]);

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTxHash(null);
    if (!ethAmount || Number(ethAmount) <= 0) {
      setError("Vui lòng nhập số ETH hợp lệ.");
      return;
    }
    setIsSwapping(true);
    try {
      const hash = await writeContractAsync({
        address: FVT_ADDRESS,
        abi: FVT_ABI,
        functionName: "swapETHForFVT",
        value: parseEther(ethAmount),
      });
      setTxHash(hash);
    } catch {
      setError("Giao dịch thất bại! Vui lòng thử lại.");
    }
    setIsSwapping(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={() => setOpen(true)}>
          Nạp FVT
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Nạp FVT</DialogTitle>
        </DialogHeader>
        {isConnected ? (
          <form
            onSubmit={handleSwap}
            className="flex flex-col gap-4 items-center"
          >
            <div className="w-full text-center">
              <div className="text-sm text-muted-foreground mb-1">
                Tỷ giá:{" "}
                <span className="font-semibold">
                  1 ETH = {RATE.toLocaleString()} FVT
                </span>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-xs mb-1 font-medium text-muted-foreground">
                Số lượng ETH
              </label>
              <Input
                type="number"
                min="0"
                step="any"
                placeholder="Nhập số ETH"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                disabled={isSwapping}
                className="w-full text-base"
              />
            </div>
            <ArrowDown className="w-4 h-4 text-muted-foreground" />
            <div className="w-full">
              <label className="block text-xs mb-1 font-medium text-muted-foreground">
                Bạn sẽ nhận
              </label>
              <Input
                value={fvtAmount + " FVT"}
                readOnly
                className="w-full bg-muted text-primary font-semibold"
                tabIndex={-1}
              />
            </div>
            <Button
              type="submit"
              disabled={isSwapping || !ethAmount || Number(ethAmount) <= 0}
              className="w-full mt-2"
            >
              {isSwapping ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" /> Đang nạp...
                </span>
              ) : (
                "Nạp FVT"
              )}
            </Button>
            {txHash && (
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 underline text-center w-full"
              >
                Xem giao dịch trên Etherscan
              </a>
            )}
            {error && (
              <div className="text-xs text-red-500 text-center w-full">
                {error}
              </div>
            )}
          </form>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            Vui lòng kết nối ví để nạp FVT.
          </div>
        )}
        <DialogClose asChild>
          <Button variant="outline">Đóng</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
