import { UniversalAddress } from '@wormhole-foundation/sdk';
import { PROGRAM_ID, WH_CHAIN_ID_SOLANA, contract, green } from './utils';

(async () => {
  try {
    const response = await contract.registerEmitter(
      WH_CHAIN_ID_SOLANA,
      new UniversalAddress(PROGRAM_ID, 'base58').address
    );
    console.log(response);
    console.log('Waiting Confirmation ...');
    const receipt = await response.wait();
    console.log(receipt);

    console.log(green('Successful Foreign Contract Registration.'));
    console.log(
      green(`Explorer Url: https://sepolia.etherscan.io/tx/${response.hash}`)
    );
  } catch (e) {
    console.error(e);
  }
})();
