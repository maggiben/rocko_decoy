import * as chains from 'wagmi/chains'
import { NETWORK } from "./env"

export const USDCContract: {[key: number]: string} = {
  [chains.mainnet.id]: "0x1622ddfe621F5a3fB43a95cD575fc164A7e6c158",
  [chains.goerli.id]: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
};

export const CometContract: {[key: number]: string} = {
  [chains.mainnet.id]: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
  [chains.goerli.id]: "0x3EE77595A8459e93C2888b13aDB354017B198188",
}

export const CometRewardContract: {[key: number]: string} = {
  [chains.mainnet.id]: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
  [chains.goerli.id]: "0xef9e070044d62C38D2e316146dDe92AD02CF2c2c",
}

export const WETHContract: {[key: number]: string} = {
  [chains.mainnet.id]: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
  [chains.goerli.id]: "0x42a71137C09AE83D8d05974960fd607d40033499",
}

export const ChainlinkEthPriceFeed: {[key: number]: string} = {
  [chains.mainnet.id]: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  [chains.goerli.id]: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
}

export const networkChainId = (chains as {[key: string]: any})[NETWORK]?.id;
export const NetworkContextName = "NETWORK";

export const ErrorMessages = {
  "-32002":
    "Already processing Metamask wallet connect. Please confirm metamask modal.",
};
  
