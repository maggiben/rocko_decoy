import React from "react";
import {
  WagmiConfig,
  configureChains,
  createConfig,
} from "wagmi";
import { infuraProvider } from 'wagmi/providers/infura'
import * as chains from 'wagmi/chains'
import { NETWORK } from "../constants/env";

const net = (chains as { [key: string]: any })[NETWORK];
export const { publicClient, webSocketPublicClient } = configureChains(
  [net],
  [infuraProvider({apiKey: process.env.REACT_APP_INFURA_APIKEY || "fde85b66d55f44e0bb36be6c88c7f1c3"})]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
})

function ZeroDevWrapper({children} : any) {
  return (
    <WagmiConfig config={config}>
        {children}
    </WagmiConfig>
  )
}

export default ZeroDevWrapper