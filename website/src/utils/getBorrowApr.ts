import * as chains from 'wagmi/chains';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ethers } from 'ethers';

const NETWORK = process.env.GATSBY_BLOCKCHAIN_NETWORK || 'goerli';
const BLOCKCHAIN = NETWORK === 'mainnet' ? 'ethereum' : NETWORK;
const COMETABI = require('./comet.json');

const networkChainId = (chains as { [key: string]: any })[NETWORK]?.id;

// See https://docs.compound.finance/#networks
const CometContract: { [key: number]: string } = {
    [chains.mainnet.id]: '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
    [chains.goerli.id]: '0x3EE77595A8459e93C2888b13aDB354017B198188',
    [chains.sepolia.id]: '',
  };

export const getBorrowAPR = async (): Promise<number> => {
  const sdk = new ThirdwebSDK(BLOCKCHAIN);

  const contract = await sdk.getContract(
    CometContract[networkChainId],
    COMETABI,
  );
  const utilization = await contract.call('getUtilization');
  const borrowRate = await contract.call('getBorrowRate', [utilization]);

  const formattedRate = Number(ethers.utils.formatEther(borrowRate));
  const borrowAPR = formattedRate * 60 * 60 * 24 * 365 * 100;
  return borrowAPR;
};

export default getBorrowAPR;
