import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { UniversalAddress } from '@wormhole-foundation/sdk';
import tokens from './tokens.json';
import {
  config,
  green,
  program,
  solanaOwner as owner,
  systemProgram,
  thisProgram
} from './utils';

const {
  maxWithdrawalFee,
  solana: { address, decimals }
} = tokens.USDC;

const token = new UniversalAddress(address, 'base58').address;
const maxWithdrawalFeeDetails = PublicKey.findProgramAddressSync(
  [Buffer.from('max_withdrawal_fee'), token],
  thisProgram
)[0];

(async () => {
  const hash = await program.methods
    .updateMaximumWithdrawalFee(
      Array.from(token),
      new BN(maxWithdrawalFee * 10 ** decimals)
    )
    .accounts({
      owner,
      config,
      maxWithdrawalFeeDetails,
      systemProgram
    })
    .rpc();

  console.log(green('Successful Updated Max Fee for USDC.'));
  console.log(
    green(`Explorer Url: https://explorer.solana.com/tx/${hash}?cluster=devnet`)
  );
})();
