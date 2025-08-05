import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('TreeRentalModule', (m) => {
  const tokenAddress = '0x2328087a12aF46F8678EbD3D60d201366D308781';

  const treeRental = m.contract('TreeRental', [tokenAddress]);
  return { treeRental };
});
