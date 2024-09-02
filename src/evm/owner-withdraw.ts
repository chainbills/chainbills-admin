import tokens from '../tokens.json';
import { green, writeContract } from './utils';

(async () => {
  await writeContract('ownerWithdraw', [tokens.USDC.sepolia.address, 0]);
  console.log(green('Successful Updated Max Fee for USDC.'));
})();
