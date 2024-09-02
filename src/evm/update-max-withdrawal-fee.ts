import tokens from '../tokens.json';
import { green, writeContract } from './utils';

(async () => {
  const {
    maxWithdrawalFee,
    sepolia: { address, decimals }
  // } = tokens.ETH;
  } = tokens.USDC;

  await writeContract('updateMaxWithdrawalFee', [
    address,
    BigInt(maxWithdrawalFee * 10 ** decimals)
  ]);
  console.log(green('Successful Updated Max Fee for USDC.')); // ETH.'));
})();
