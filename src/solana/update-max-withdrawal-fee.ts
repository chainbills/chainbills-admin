import { BN } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync as getATA
} from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import tokens from '../tokens.json';
import {
  chainStats,
  config,
  chainbillsFeeCollector as feeCollector,
  getPDA,
  green,
  solanaOwner as owner,
  program,
  systemProgram,
  tokenProgram
} from './utils';

const {
  maxWithdrawalFee,
  solana: { address, decimals }
} = tokens.USDC;
const mint = new PublicKey(address);

const maxWithdrawalFeeDetails = getPDA([
  Buffer.from('max_withdrawal_fee'),
  mint.toBuffer()
]);
const chainTokenAccount = getATA(mint, chainStats, true);
const feesTokenAccount = getATA(mint, feeCollector, true);

(async () => {
  const hash = await program.methods
    .updateMaxWithdrawalFee(mint, new BN(maxWithdrawalFee * 10 ** decimals))
    .accounts({
      maxWithdrawalFeeDetails,
      chainTokenAccount,
      feeCollector,
      feesTokenAccount,
      config,
      chainStats,
      mint,
      owner,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram,
      systemProgram
    })
    .rpc();

  console.log(green('Successful Updated Max Fee for USDC.'));
  console.log(
    green(`Explorer Url: https://explorer.solana.com/tx/${hash}?cluster=devnet`)
  );
})();
