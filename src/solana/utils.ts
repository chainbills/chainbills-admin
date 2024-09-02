import {
  AnchorProvider,
  Wallet as AnchorWallet,
  Program,
  web3
} from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { getContracts, toChainId } from '@wormhole-foundation/sdk';
import bs58 from 'bs58';
import 'dotenv/config';
import { Chainbills, IDL } from './chainbills';

export const PROGRAM_ID = '25DUdGkxQgDF7uN58viq6Mjegu3Ajbq2tnQH3zmgX2ND';
export const WH_CHAIN_ID_SEPOLIA = toChainId('Sepolia');
export const WH_CHAIN_ID_SOLANA = toChainId('Solana');
export const WH_NETWORK = 'Testnet';

export const green = (input: any) => '\x1b[32m' + input + '\x1b[0m';
export const red = (input: any) => '\x1b[31m' + input + '\x1b[0m';
export const error = (input: any): Error => {
  console.error(red(input));
  process.exit(1);
};

if (!process.env.EVM_OWNER_KEY) throw error('Set EVM_OWNER_KEY in .env');
export const evmOwnerKey = process.env.EVM_OWNER_KEY as `0x${string}`;

if (!process.env.SOLANA_OWNER_KEY) throw error('Set SOLANA_OWNER_KEY in .env');
const ownerKeypair = Keypair.fromSecretKey(
  bs58.decode(process.env.SOLANA_OWNER_KEY)
);
export const solanaOwnerWallet = new AnchorWallet(ownerKeypair);
export const solanaOwner = solanaOwnerWallet.publicKey;

if (!process.env.CHAINBILLS_FEE_COLLECTOR_SOLANA) {
  throw error('Set CHAINBILLS_FEE_COLLECTOR_SOLANA in .env');
}
export const chainbillsFeeCollector = new PublicKey(
  process.env.CHAINBILLS_FEE_COLLECTOR_SOLANA
);

export const connection = new Connection(clusterApiUrl('devnet'));
export const systemProgram = new PublicKey(web3.SystemProgram.programId);
export const getPDA = (seeds: (Uint8Array | Buffer)[]) =>
  PublicKey.findProgramAddressSync(seeds, new PublicKey(PROGRAM_ID))[0];
export const config = getPDA([Buffer.from('config')]);
export const chainStats = getPDA([Buffer.from('chain')]);
export const program = new Program<Chainbills>(
  IDL,
  PROGRAM_ID,
  new AnchorProvider(connection, solanaOwnerWallet, {})
);
export const tokenProgram = new PublicKey(TOKEN_PROGRAM_ID);

const { coreBridge } = getContracts(WH_NETWORK, 'Solana');
if (!coreBridge) throw error('Got Invalid Solana coreBridge from Wormhole');
export const wormholeProgram = new PublicKey(coreBridge);
export const getWhPDA = (seeds: (Uint8Array | Buffer)[]) =>
  PublicKey.findProgramAddressSync(seeds, wormholeProgram)[0];
