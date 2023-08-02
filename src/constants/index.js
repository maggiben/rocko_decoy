export const ChainId = {
    MAINNET: 1,
    TESTNET: 5,
    AVALANCHE: 43114,
    FUJI: 43113,
    ETHEREUM: 1,
    GÖRLI: 5,
    KOVAN: 42,
    MATIC: 137,
    MATIC_TESTNET: 80001,
    FANTOM: 250,
    FANTOM_TESTNET: 4002,
    BSC: 56,
    BSC_TESTNET: 97,
    ARBITRUM: 79377087078960,
    HARMONY: 1666600000,
    HARMONY_TESTNET: 1666700000,
  };
  
  export const LoanContract = {
    [ChainId["MAINNET"]]: "0x1622ddfe621F5a3fB43a95cD575fc164A7e6c158",
    [ChainId["TESTNET"]]: "0xd5f47d7113991246f3d7b013849Ca32FA8d92E31",
  };
  
  export const USDCContract = {
    [ChainId["MAINNET"]]: "0x1622ddfe621F5a3fB43a95cD575fc164A7e6c158",
    [ChainId["TESTNET"]]: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
  };

  export const CometContract = {
    [ChainId["MAINNET"]]: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
    [ChainId["TESTNET"]]: "0x3EE77595A8459e93C2888b13aDB354017B198188",
  }

  export const WETHContract = {
    [ChainId["MAINNET"]]: "0xc3d688B66703497DAA19211EEdff47f25384cdc3",
    [ChainId["TESTNET"]]: "0x42a71137C09AE83D8d05974960fd607d40033499",
  }

  export const mainNetworkChainId = ChainId.MAINNET;
  export const testNetworkChainId = ChainId.TESTNET;
  export const NetworkContextName = "NETWORK";
  
  export const ErrorMessages = {
    "-32002":
      "Already processing Metamask wallet connect. Please confirm metamask modal.",
  };
  
  export const MoralisAPIKey =
    "pT8v9ybSBYdDiwVF6uytzwEuHU5uyUMisiqMMTnu6mlS4LPjG2hgFUeNiSgXE7VN";
  
  export const CoinmarketcapAPIKey = 
    "c1aa34f3-7b85-481f-9fe6-55b9454ef4c1";