import * as chains from 'wagmi/chains'
import { NETWORK } from "./env";

  export const LoanContract = {
    [chains.mainnet.id]: "0x1622ddfe621F5a3fB43a95cD575fc164A7e6c158",
    [chains.goerli.id]: "0xd5f47d7113991246f3d7b013849Ca32FA8d92E31",
  };
  
  export const USDCContract = {
    [chains.mainnet.id]: "0x1622ddfe621F5a3fB43a95cD575fc164A7e6c158",
    [chains.goerli.id]: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  };

  export const CometContract = {
    [chains.mainnet.id]: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
    [chains.goerli.id]: "0x3EE77595A8459e93C2888b13aDB354017B198188",
  }

  export const CometRewardContract = {
    [chains.mainnet.id]: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
    [chains.goerli.id]: "0xef9e070044d62C38D2e316146dDe92AD02CF2c2c",
  }

  export const WETHContract = {
    [chains.mainnet.id]: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
    [chains.goerli.id]: "0x42a71137C09AE83D8d05974960fd607d40033499",
  }

  export const networkChainId = chains[NETWORK]?.id;
  export const NetworkContextName = "NETWORK";
  
  export const ErrorMessages = {
    "-32002":
      "Already processing Metamask wallet connect. Please confirm metamask modal.",
  };
  
  export const MoralisAPIKey =
    "pT8v9ybSBYdDiwVF6uytzwEuHU5uyUMisiqMMTnu6mlS4LPjG2hgFUeNiSgXE7VN";
  
  export const CoinmarketcapAPIKey = 
    "c1aa34f3-7b85-481f-9fe6-55b9454ef4c1";