import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import { UniversalAddress } from '@wormhole-foundation/sdk';
import {
  CONTRACT_ADDRESS,
  WH_CHAIN_ID_SEPOLIA,
  config,
  green,
  program,
  sepoliaTokenBridge,
  solanaOwner as owner,
  solanaTokenBridge,
  systemProgram,
  thisProgram
} from './utils';

const chainStats = PublicKey.findProgramAddressSync(
  [
    Buffer.from('chain'),
    new BN(WH_CHAIN_ID_SEPOLIA).toArrayLike(Buffer, 'le', 2)
  ],
  thisProgram
)[0];
const foreignContract = PublicKey.findProgramAddressSync(
  [
    Buffer.from('foreign_contract'),
    new BN(WH_CHAIN_ID_SEPOLIA).toArrayLike(Buffer, 'le', 2)
  ],
  thisProgram
)[0];
const tokenBridgeForeignEndpoint = PublicKey.findProgramAddressSync(
  [
    new BN(WH_CHAIN_ID_SEPOLIA).toArrayLike(Buffer, 'be', 2),
    sepoliaTokenBridge
  ],
  solanaTokenBridge
)[0];

(async () => {
  const accounts = {
    owner,
    chainStats,
    systemProgram,
    config,
    foreignContract,
    tokenBridgeProgram: solanaTokenBridge,
    tokenBridgeForeignEndpoint
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
