"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { Button } from "@/components/ui/button";

export default function ConnectWalletButton() {
  const { isConnected } = useAccount();
  const { connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <Button variant="outline" onClick={() => disconnect()}>
        Ngắt kết nối
      </Button>
    );

  return (
    <Button
      onClick={() => connect({ connector: metaMask() })}
      disabled={isPending}
    >
      {isPending ? "Đang kết nối..." : "Kết nối MetaMask"}
    </Button>
  );
}
