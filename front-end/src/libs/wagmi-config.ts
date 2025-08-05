import { createConfig, http } from "@wagmi/core";
import { polygonAmoy } from "@wagmi/core/chains";
import { metaMask } from "@wagmi/connectors";

export const config = createConfig({
  chains: [polygonAmoy],
  connectors: [metaMask()],
  transports: {
    [polygonAmoy.id]: http(),
  },
});
