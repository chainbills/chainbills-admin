import {
  AnchorProvider,
  BN,
  Program,
  Wallet,
  web3
} from '@project-serum/anchor';
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getContracts, toChainId } from '@wormhole-foundation/sdk';
import 'dotenv/config';
import { Chainbills } from './chainbills';
import idl from './idl.json';

if (!process.env.SOLANA_OWNER_KEY) throw 'Set SOLANA_OWNER_KEY in .env';

const green = (input: any) => '\x1b[32m' + input + '\x1b[0m';

const PROGRAM_DATA = 'BTcwUzyqafBYqFFULcNo9uRyo2TEy6U9Rtxv4idvox9D';
const PROGRAM_ID = '7YWuy7VkB76uJXt8xHaQu8aGWodG7NUaCkmzVFWg94xk';
const WH_CHAIN = 'Solana';
const WH_CHAIN_ID_SOLANA = toChainId(WH_CHAIN);
const WH_NETWORK = 'Testnet';

const ownerWallet = new Wallet(
  Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(process.env.SOLANA_OWNER_KEY))
  )
);
const owner = ownerWallet.publicKey;

const connection = new Connection(clusterApiUrl('devnet'));
const systemProgram = new PublicKey(web3.SystemProgram.programId);
const thisProgram = new PublicKey(PROGRAM_ID);
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
const config = PublicKey.findProgramAddressSync(
  [Buffer.from('config')],
  thisProgram
)[0];

const { coreBridge, tokenBridge } = getContracts(WH_NETWORK, WH_CHAIN);
if (!coreBridge) throw 'Got Invalid coreBridge contract from Wormhole';
if (!tokenBridge) throw 'Got Invalid tokenBridge contract from Wormhole';

const wormholeProgram = new PublicKey(coreBridge);
const tokenBridgeProgram = new PublicKey(tokenBridge);

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

const program = new Program<Chainbills>(
  idl as Chainbills,
  PROGRAM_ID,
  new AnchorProvider(connection, ownerWallet, {})
);

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
