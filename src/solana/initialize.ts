import { BN } from '@project-serum/anchor';
import {
  chainbillsFeeCollector,
  chainStats,
  config,
  getPDA,
  getWhPDA,
  green,
  solanaOwner as owner,
  program,
  systemProgram,
  wormholeProgram
} from './utils';

const wormholeBridge = getWhPDA([Buffer.from('Bridge')]);
const wormholeEmitter = getPDA([Buffer.from('emitter')]);
const wormholeFeeCollector = getWhPDA([Buffer.from('fee_collector')]);
const wormholeSequence = getWhPDA([
  Buffer.from('Sequence'),
  wormholeEmitter.toBuffer()
]);
const wormholeMessage = getPDA([
  Buffer.from('sent'),
  new BN(1).toArrayLike(Buffer, 'le', 8) // 1 represents 1st Wormhole Sequence
]);

(async () => {
  const accounts = {
    owner,
    chainStats,
    config,
    chainbillsFeeCollector,
    wormholeProgram,
    wormholeBridge,
    wormholeEmitter,
    wormholeFeeCollector,
    wormholeSequence,
    wormholeMessage,
    systemProgram
  };

  const hash = await program.methods.initialize().accounts(accounts).rpc();

  console.log(green('Successful Initialization.'));
  console.log(
    green(`Explorer Url: https://explorer.solana.com/tx/${hash}?cluster=devnet`)
  );
})();
