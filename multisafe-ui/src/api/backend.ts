import { NETWORK } from '@trustmachines/multisafe-contracts';
import { DATA_BACKENDS } from '../constants';

// TODO: Use backend api for all (possible) data read operations
// TODO: Refactor SafeB to Safe

export type Status = 'mempool' | 'microblock' | 'anchor' | 'failed';

export interface SafeB {
  address: string,
  sender: string,
  tx_hash: string,
  threshold: number,
  version: string,
  nonce: number,
  owners: string[],
  time: number,
  status: Status,
  balance: string
}

export const getSafes = async (network: NETWORK, owner: string): Promise<SafeB[]> => {
  try {
    // First get all transactions for this owner
    const response = await fetch(`${DATA_BACKENDS[network]}/v2/accounts/${owner}/transactions`);
    const data = await response.json();

    // Filter and transform the transactions to get safe information
    const safes = data.results
      .filter((tx: any) => tx.tx_type === 'contract_call' && tx.contract_call?.contract_id?.includes('safe'))
      .map((tx: any) => ({
        address: tx.contract_call.contract_id,
        sender: tx.sender_address,
        tx_hash: tx.tx_id,
        threshold: tx.contract_call.function_args?.[0]?.repr || 1,
        version: '0.1.0',
        nonce: 0,
        owners: [tx.sender_address],
        time: new Date(tx.burn_block_time * 1000).getTime(),
        status: tx.tx_status.toLowerCase(),
        balance: '0'
      }));

    return safes;
  } catch (error) {
    console.error('Error fetching safes:', error);
    return [];
  }
}
