import { BN } from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';
import {
  PROGRAM_DATA,
  WH_CHAIN_ID_SOLANA,
  config,
  green,
  solanaOwner as owner,
  program,
  systemProgram,
  thisProgram,
  solanaTokenBridge as tokenBridgeProgram,
  wormholeProgram
} from './utils';

const thisProgramData = new PublicKey(PROGRAM_DATA);
const chainStats = PublicKey.findProgramAddressSync(
  [
    Buffer.from('chain'),
    new BN(WH_CHAIN_ID_SOLANA).toArrayLike(Buffer, 'le', 2)
  ],
  thisProgram
)[0];
const globalStats = PublicKey.findProgramAddressSync(
  [Buffer.from('global')],
  thisProgram
)[0];

const wormholeBridge = PublicKey.findProgramAddressSync(
  [Buffer.from('Bridge')],
  wormholeProgram
)[0];
const tokenBridgeConfig = PublicKey.findProgramAddressSync(
  [Buffer.from('config')],
  tokenBridgeProgram
)[0];
const emitter = PublicKey.findProgramAddressSync(
  [Buffer.from('emitter')],
  wormholeProgram
)[0];
const feeCollector = PublicKey.findProgramAddressSync(
  [Buffer.from('fee_collector')],
  wormholeProgram
)[0];
const sequence = PublicKey.findProgramAddressSync(
  [Buffer.from('Sequence'), emitter.toBuffer()],
  wormholeProgram
)[0];
const mintAuthority = PublicKey.findProgramAddressSync(
  [Buffer.from('mint_signer')],
  tokenBridgeProgram
)[0];
const custodySigner = PublicKey.findProgramAddressSync(
  [Buffer.from('custody_signer')],
  tokenBridgeProgram
)[0];
const authoritySigner = PublicKey.findProgramAddressSync(
  [Buffer.from('authority_signer')],
  tokenBridgeProgram
)[0];

(async () => {
  const accounts = {
    owner,
    thisProgram,
    thisProgramData,
    globalStats,
    chainStats,
    systemProgram,
    config,
    wormholeProgram,
    tokenBridgeProgram,
    wormholeBridge,
    tokenBridgeConfig,
    emitter,
    feeCollector,
    sequence,
    mintAuthority,
    custodySigner,
    authoritySigner
  };

  const hash = await program.methods.initialize().accounts(accounts).rpc();

  console.log(green('Successful Initialization.'));
  console.log(
    green(`Explorer Url: https://explorer.solana.com/tx/${hash}?cluster=devnet`)
  );
})();
