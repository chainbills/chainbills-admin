import { GasPrice } from '@cosmjs/stargate';
import 'dotenv/config';

export const cosmwasmOwnerKey = process.env.COSMWASM_OWNER_KEY;
if (!cosmwasmOwnerKey) throw 'Set COSMWASM_OWNER_KEY';

export const cosmwasmCodeId = process.env.COSMWASM_CODE_ID;
if (!cosmwasmCodeId) throw 'Set COSMWASM_CODE_ID';

export const cosmwasmFeeCollector =
  process.env.CHAINBILLS_FEE_COLLECTOR_COSMWASM;
if (!cosmwasmFeeCollector) throw 'Set CHAINBILLS_FEE_COLLECTOR_COSMWASM';

export const rpcEndpoint = 'https://rpc.xion-testnet-1.burnt.com:443';

const gasPrice = GasPrice.fromString('0uxion');
export const txOptions = { gasPrice };

export const CONTRACT_ADDRESS =
  'xion1g378skyp9y28n2ud6xdpf4jgrd5nc6j7029wk8t56p044f3m6j0ql6d3v9';

export const convertBigints = (input: any): any => {
  if (typeof input === 'bigint') return Number(input);
  if (typeof input !== 'object' || input === null) return input;
  if (Array.isArray(input)) return input.map(convertBigints);
  const output: Record<string, any> = {};
  for (const [key, value] of Object.entries(input)) {
    output[key] = convertBigints(value);
  }
  return output;
};
