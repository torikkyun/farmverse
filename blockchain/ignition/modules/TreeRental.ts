import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TreeRentalModule', (m) => {
  const tokenAddress = '0xE878E123125eBd89dAD65cCE3bD88a38749E8087';

  const treeRental = m.contract('TreeRental', [tokenAddress]);
  return { treeRental };
});
