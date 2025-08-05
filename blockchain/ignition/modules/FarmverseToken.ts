import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('FarmverseTokenModule', (m) => {
  const farmverseToken = m.contract('FarmverseToken');
  return { farmverseToken };
});
