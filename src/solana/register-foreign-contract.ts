import { BN } from '@project-serum/anchor';
import { UniversalAddress } from '@wormhole-foundation/sdk';
import {
  CONTRACT_ADDRESS,
  WH_CHAIN_ID_SEPOLIA,
  config,
  getPDA,
  green,
  solanaOwner as owner,
  program,
  systemProgram
} from './utils';

const foreignContract = getPDA([
  Buffer.from('foreign_contract'),
  new BN(WH_CHAIN_ID_SEPOLIA).toArrayLike(Buffer, 'le', 2)
]);

(async () => {
  const accounts = {
    foreignContract,
    config,
    owner,
    systemProgram
  };

  const hash = await program.methods
    .registerForeignContract(
      WH_CHAIN_ID_SEPOLIA,
      Array.from(new UniversalAddress(CONTRACT_ADDRESS, 'hex').address)
    )
    .accounts(accounts)
    .rpc();

  console.log(green('Successful Foreign Contract Registration.'));
  console.log(
    green(`Explorer Url: https://explorer.solana.com/tx/${hash}?cluster=devnet`)
  );
})();
