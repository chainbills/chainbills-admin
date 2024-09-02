import { BN } from '@project-serum/anchor';
import { getAssociatedTokenAddressSync as getATA } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { USDC } from '../tokens.json';
import {
  chainStats,
  config,
  green,
  solanaOwner as owner,
  program,
  tokenProgram
} from './utils';

const mint = new PublicKey(USDC.solana.address);

(async () => {
  const accounts = {
    mint,
    chainStats,
    chainTokenAccount: getATA(mint, chainStats, true),
    ownerTokenAccount: getATA(mint, owner, true),
    config,
    owner,
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
