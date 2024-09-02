import { UniversalAddress } from '@wormhole-foundation/sdk';
import { PROGRAM_ID, WH_CHAIN_ID_SOLANA } from '../solana/utils';
import { green, writeContract } from './utils';

(async () => {
  await writeContract('registerForeignContract', [
    WH_CHAIN_ID_SOLANA,
    new UniversalAddress(PROGRAM_ID, 'base58').address
  ]);
  console.log(green('Successful Foreign Contract Registration.'));
})();
