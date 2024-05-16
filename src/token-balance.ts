import { getAssociatedTokenAddressSync as getATA } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { USDC } from './tokens.json';
import { connection, green, thisProgram } from './utils';

const globalStats = PublicKey.findProgramAddressSync(
  [Buffer.from('global')],
  thisProgram
)[0];
const mint = new PublicKey(USDC.solana.address);

(async () => {
  const balance = (
    await connection.getTokenAccountBalance(getATA(mint, globalStats, true))
  ).value.uiAmount;
  console.log(green(`USDC Balance: ${balance}`));
})();
