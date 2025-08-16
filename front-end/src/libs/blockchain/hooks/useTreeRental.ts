import { useWriteContract } from "wagmi";
import { TREE_RENTAL_ABI } from "../abis/TreeRental";
import { parseUnits } from "viem";

export function useTreeRental() {
  const { writeContractAsync, ...rest } = useWriteContract();

  const rentTree = async ({
    contractAddress,
    costPerYear,
    contractHash,
    account,
  }: {
    contractAddress: `0x${string}`;
    costPerYear: string;
    contractHash: string;
    account: `0x${string}`;
  }) => {
    return writeContractAsync({
      address: contractAddress,
      abi: TREE_RENTAL_ABI,
      functionName: "rentTree",
      args: [contractHash, parseUnits(costPerYear, 18)],
      account,
    });
  };

  return { rentTree, ...rest };
}
