import 'dotenv/config';
import {
  createPublicClient,
  createWalletClient,
  formatEther,
  http
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import { abi } from './abi';

const evmOwnerKey = process.env.EVM_OWNER_KEY as `0x${string}`;
if (!evmOwnerKey) throw 'Set EVM_OWNER_KEY';
const account = privateKeyToAccount(evmOwnerKey);
const config = { chain: sepolia, transport: http('https://sepolia.drpc.org') };

export const CONTRACT_ADDRESS: `0x${string}` =
  '0x5c9c9e008e73689b37575e36c4ad654f16799bef';

export const publicClient = createPublicClient({ ...config });

export const green = (input: any) => '\x1b[32m' + input + '\x1b[0m';
export const red = (input: any) => '\x1b[31m' + input + '\x1b[0m';
export const error = (input: any): Error => {
  console.error(red(input));
  process.exit(1);
};

const showBalance = async () => {
  const address = account.address;
  const balance = formatEther(await publicClient.getBalance({ address }));
  console.log(`Admin Balance (${address}): ${`${balance} ETH`}`);
  return balance;
};

export const writeContract = async (functionName: any, args: any) => {
  try {
    const prevBalance = await showBalance();
    const { result, request } = await publicClient.simulateContract({
      address: CONTRACT_ADDRESS,
      abi,
      functionName,
      args,
      account
    });
    const walletClient = createWalletClient({ account, ...config });
    const hash = await walletClient.writeContract(request);
    console.log('Transaction Hash: ', hash);
    console.log(green('Waiting for On-Chain Confirmation ...'));
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log(green('Transaction Receipt'));
    console.log(receipt);
    const newBalance = await showBalance();
    const balanceDiffs = +newBalance - +prevBalance;
    console.log(`Owner Balance Change: ${`${balanceDiffs} ETH`}`);
    console.log(green(`Explorer Url: https://sepolia.etherscan.io/tx/${hash}`));
    return result;
  } catch (e) {
    error(e);
  }
};
