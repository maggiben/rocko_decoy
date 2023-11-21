import * as chains from 'wagmi/chains';
import { NETWORK } from './env';

// See https://developers.circle.com/stablecoins/docs/usdc-on-testing-networks
export const USDCContract: { [key: number]: string } = {
  // See https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
  [chains.mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [chains.goerli.id]: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
  [chains.sepolia.id]: '',
};

// See https://docs.compound.finance/#networks
export const CometContract: { [key: number]: string } = {
  [chains.mainnet.id]: '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
  [chains.goerli.id]: '0x3EE77595A8459e93C2888b13aDB354017B198188',
  [chains.sepolia.id]: '',
};
export const CometRewardContract: { [key: number]: string } = {
  [chains.mainnet.id]: '0x1B0e765F6224C21223AeA2af16c1C46E38885a40',
  [chains.goerli.id]: '0xef9e070044d62C38D2e316146dDe92AD02CF2c2c',
  [chains.sepolia.id]: '',
};
export const WETHContract: { [key: number]: string } = {
  [chains.mainnet.id]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [chains.goerli.id]: '0x42a71137C09AE83D8d05974960fd607d40033499',
  [chains.sepolia.id]: '',
};

// See https://docs.chain.link/data-feeds/price-feeds/addresses/?network=ethereum
export const ChainlinkEthPriceFeed: { [key: number]: string } = {
  [chains.mainnet.id]: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  [chains.goerli.id]: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
  [chains.sepolia.id]: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
};

export const networkChainId = (chains as { [key: string]: any })[NETWORK]?.id;
export const NetworkContextName = 'NETWORK';

export const ErrorMessages = {
  '-32002':
    'Already processing Metamask wallet connect. Please confirm metamask modal.',
};
