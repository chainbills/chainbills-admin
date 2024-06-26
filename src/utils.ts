import {
  AnchorProvider,
  Wallet as AnchorWallet,
  Program,
  web3
} from '@project-serum/anchor';
import { Connection, Keypair, PublicKey, clusterApiUrl } from '@solana/web3.js';
import {
  UniversalAddress,
  getContracts,
  toChainId
} from '@wormhole-foundation/sdk';
import 'dotenv/config';
import { Contract, Wallet as EvmWallet, JsonRpcProvider } from 'ethers';
import abi from './abi';
import { Chainbills, IDL } from './chainbills';

export const CONTRACT_ADDRESS: `0x${string}` =
  '0xb52CB1AD5D67C5CD25180f8cdB48D22243291884';
export const PROGRAM_DATA = 'DJLaALNipXGqxQL947naAmEjUGwDEaHkaL1NDfLXkc6V';
export const PROGRAM_ID = 'p7Lu1yPzMRYLfLxWbEePx8kn3LNevFTbGVC5ghyADF9';
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

export const contract = new Contract(
  CONTRACT_ADDRESS,
  abi,
  new EvmWallet(evmOwnerKey, new JsonRpcProvider('https://rpc.sepolia.org'))
);

if (!process.env.SOLANA_OWNER_KEY) throw error('Set SOLANA_OWNER_KEY in .env');
const ownerKeypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env.SOLANA_OWNER_KEY))
);
export const solanaOwnerWallet = new AnchorWallet(ownerKeypair);
export const solanaOwner = solanaOwnerWallet.publicKey;

export const connection = new Connection(clusterApiUrl('devnet'));
export const thisProgram = new PublicKey(PROGRAM_ID);
export const systemProgram = new PublicKey(web3.SystemProgram.programId);
export const config = PublicKey.findProgramAddressSync(
  [Buffer.from('config')],
  thisProgram
)[0];

export const program = new Program<Chainbills>(
  IDL,
  PROGRAM_ID,
  new AnchorProvider(connection, solanaOwnerWallet, {})
);

const { coreBridge, tokenBridge: solTB } = getContracts(WH_NETWORK, 'Solana');
if (!coreBridge) throw error('Got Invalid Solana coreBridge from Wormhole');
if (!solTB) throw error('Got Invalid Solana tokenBridge from Wormhole');

export const wormholeProgram = new PublicKey(coreBridge);
export const solanaTokenBridge = new PublicKey(solTB);

const { tokenBridge: sepoliaTB } = getContracts(WH_NETWORK, 'Sepolia');
if (!sepoliaTB) throw error('Got Invalid Sepolia tokenBridge from Wormhole');

export const sepoliaTokenBridge = new UniversalAddress(sepoliaTB, 'hex')
  .address;
