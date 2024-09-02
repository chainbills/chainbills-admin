import { getAssociatedTokenAddressSync as getATA } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { USDC } from '../tokens.json';
import { chainStats, connection, green } from './utils';

(async () => {
  const mint = new PublicKey(USDC.solana.address);
  const balance = (
    await connection.getTokenAccountBalance(getATA(mint, chainStats, true))
  ).value.uiAmount;
  console.log(green(`USDC Balance: ${balance}`));
})();
