import { useWriteContract } from "wagmi";
import { FVT_ABI } from "@/libs/blockchain/abis/FarmverseToken";
import { parseUnits } from "viem";

export function useApproveFVT() {
  const { writeContractAsync, ...rest } = useWriteContract();

  const approveFVT = async ({
    tokenAddress,
    spender,
    amount,
    account,
  }: {
    tokenAddress: `0x${string}`;
    spender: `0x${string}`;
    amount: string;
    account: `0x${string}`;
  }) => {
    return writeContractAsync({
      address: tokenAddress,
      abi: FVT_ABI,
      functionName: "approve",
      args: [spender, parseUnits(amount, 18)],
      account,
    });
  };

  return { approveFVT, ...rest };
}
