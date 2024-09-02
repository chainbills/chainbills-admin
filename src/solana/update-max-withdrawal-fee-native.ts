import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import tokens from '../tokens.json';
import {
  config,
  getPDA,
  green,
  solanaOwner as owner,
  program,
  systemProgram
} from './utils';

const {
  maxWithdrawalFee,
  solana: { address, decimals }
} = tokens.SOL;

const maxWithdrawalFeeDetails = getPDA([
  Buffer.from('max_withdrawal_fee'),
  new PublicKey(address).toBuffer()
]);

(async () => {
  const hash = await program.methods
    .updateMaxWithdrawalFeeNative(new BN(maxWithdrawalFee * 10 ** decimals))
    .accounts({
      maxWithdrawalFeeDetails,
      config,
      owner,
      systemProgram
    })
    .rpc();

  console.log(green('Successful Updated Max Fee for SOL.'));
  console.log(
    green(`Explorer Url: https://explorer.solana.com/tx/${hash}?cluster=devnet`)
  );
})();
