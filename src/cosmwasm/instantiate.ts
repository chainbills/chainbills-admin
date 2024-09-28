import { rawSecp256k1PubkeyToRawAddress } from '@cosmjs/amino';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { toBech32 } from '@cosmjs/encoding';
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing';
import 'dotenv/config';
import { writeFileSync } from 'fs';
import {
  convertBigints,
  cosmwasmCodeId,
  cosmwasmFeeCollector,
  cosmwasmOwnerKey,
  rpcEndpoint,
  txOptions
} from './utils';

// The main function to create and use the SigningStargateClient
(async () => {
  // Creating a wallet instance from a given mnemonic
  const wallet = await DirectSecp256k1Wallet.fromKey(
    Buffer.from(cosmwasmOwnerKey!, 'hex'),
    'xion'
  );

  // Fetching account from the wallet
  const [account] = await wallet.getAccounts();
  const sender = toBech32(
    'xion',
    rawSecp256k1PubkeyToRawAddress(account.pubkey)
  );

  // Creating an instance of SigningCosmwasmClient
  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    wallet,
    txOptions
  );

  const result = await client.instantiate(
    sender,
    +cosmwasmCodeId!,
    {
      msg: {
        chain_id: 40,
        chainbills_fee_collector: cosmwasmFeeCollector
      }
    },
    'chainbills',
    'auto',
    { admin: sender }
  );

  console.log(result);
  writeFileSync(
    'src/cosmwasm/cosmwasm-result.json',
    JSON.stringify(convertBigints(result), null, 2)
  );
})();
