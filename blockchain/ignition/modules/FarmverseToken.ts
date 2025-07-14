import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

export default buildModule('FarmverseTokenModule', (m) => {
  const initialSupply = m.getParameter(
    'initialSupply',
    '1000000000000000000000000',
  );
  const farmverseToken = m.contract('FarmverseToken', [initialSupply]);
  return { farmverseToken };
});
