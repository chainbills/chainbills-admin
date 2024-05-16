import { BN } from '@project-serum/anchor';
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync as getATA
} from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { USDC } from './tokens.json';
import {
  PROGRAM_DATA,
  solanaOwner as admin,
  config,
  green,
  program,
  thisProgram
} from './utils';

const globalStats = PublicKey.findProgramAddressSync(
  [Buffer.from('global')],
  thisProgram
)[0];
const tokenProgram = new PublicKey(TOKEN_PROGRAM_ID);
const thisProgramData = new PublicKey(PROGRAM_DATA);
const mint = new PublicKey(USDC.solana.address);

(async () => {
  const accounts = {
    mint,
    globalStats,
    thisProgram,
    thisProgramData,
    globalTokenAccount: getATA(mint, globalStats, true),
    admin,
    adminTokenAccount: getATA(mint, admin, true),
    config,
    tokenProgram
  };

  const hash = await program.methods
    .ownerWithdraw(new BN(0))
    .accounts(accounts)
    .rpc();

  console.log(green('Successful Owner Withdrawal.'));
  console.log(
    green(`Explorer Url: https://explorer.solana.com/tx/${hash}?cluster=devnet`)
  );
})();
