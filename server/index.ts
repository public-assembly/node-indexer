import 'dotenv/config';
import { getEvents } from './fetchEvents';
import {bundlr} from './bundlrInit'

async function main() {

// print the eth wallet addres connected to the bundlr client
  console.log('Connected wallet address:', bundlr.address);

// print balance of connected wallet. notice its loaded balance so this is in case you've prefunded bundlr already
  const atomicBalance = await bundlr.getLoadedBalance();
  const convertedBalance = bundlr.utils.fromAtomic(atomicBalance).toString();
  console.log('Account balance:', convertedBalance);
// fetch event logs from chain
  const result = await getEvents();
// if no logs return early
  if (typeof result === 'string') {
    console.log('No new logs to upload.');
    return;
  }

  console.log('Starting to fetch press creation events...');

  // start parse. this is not working at the moment, we just get the value of where we should start next but need to fix this lowkey. help
  
  // parse logsJson into an array of log objects
  const logs = JSON.parse(result.logsJson);

  // get the last log from the array
  const lastLog = logs[logs.length - 1];

  // extract the responseId and blockNumber properties
  const blockNumber = lastLog.blockNumber;

  // assign the blockNumber to fromBlock for the next execution
  let fromBlock = BigInt(blockNumber) + BigInt(1);

  console.log('Next fromBlock:', fromBlock);
}

main();

