import * as chains from 'wagmi/chains';
import { NETWORK } from './env';

export const ROCKO_WEBSITE_URL = 'https://rocko.co';

// See https://developers.circle.com/stablecoins/docs/usdc-on-testing-networks
export const USDCContract: { [key: number]: string } = {
  [chains.mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [chains.sepolia.id]: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
  [chains.base.id]: '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
};

// Comp USDC Contract cUSDCv3
// See https://docs.compound.finance/#networks
export const CometContract: { [key: number]: string } = {
  [chains.mainnet.id]: '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
  [chains.sepolia.id]: '0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e',
  // !! cUSDbCv3
  [chains.base.id]: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
};

export const CometRewardContract: { [key: number]: string } = {
  [chains.mainnet.id]: '0x1B0e765F6224C21223AeA2af16c1C46E38885a40',
  [chains.sepolia.id]: '0x8bF5b658bdF0388E8b482ED51B14aef58f90abfD',
  [chains.base.id]: '0x123964802e6ABabBE1Bc9547D72Ef1B69B00A6b1',
};

// Comp Wrapped Ether Contract
// See https://docs.compound.finance/#networks
export const WETHContract: { [key: number]: string } = {
  [chains.mainnet.id]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  [chains.sepolia.id]: '0x2D5ee574e710219a521449679A4A7f2B43f046ad',
  [chains.base.id]: '0x4200000000000000000000000000000000000006',
};

// ChainLink ETH/USD Price Feed
// See https://docs.chain.link/data-feeds/price-feeds/addresses/?network=ethereum
export const ChainlinkEthPriceFeed: { [key: number]: string } = {
  [chains.mainnet.id]: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  [chains.sepolia.id]: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
  [chains.base.id]: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
};

export const networkChainId = (chains as { [key: string]: any })[NETWORK]?.id;
export const NetworkContextName = 'NETWORK';

export const ErrorMessages = {
  '-32002':
    'Already processing Metamask wallet connect. Please confirm metamask modal.',
};

const sanc = ['CU', 'IR', 'KP', 'RU', 'SY', 'UA'];
const nonCompSanc = [
  'AF',
  'BY',
  'MM',
  'CF',
  'CD',
  'CI',
  'ET',
  'IQ',
  'LB',
  'LR',
  'LY',
  'ML',
  'NI',
  'SO',
  'SS',
  'SD',
  'VE',
  'YE',
  'ZW',
];
const balkans = ['AL', 'BA', 'ME', 'XK', 'MK', 'RS'];

export const exculdedCountries = [...sanc, ...nonCompSanc, ...balkans].map(
  (c) => c.toLowerCase(),
);
