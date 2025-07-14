import type { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox-viem';

import 'dotenv/config';

const config: HardhatUserConfig = {
  solidity: '0.8.28',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_RPC_KEY}`,
      accounts: [`${process.env.METAMASK_WALLET_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`,
  },
};

export default config;
