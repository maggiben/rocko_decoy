import React from "react";
import {
  WagmiConfig,
  configureChains,
  createConfig,
} from "wagmi";
import { infuraProvider } from 'wagmi/providers/infura'
import * as chains from 'wagmi/chains'
import { NETWORK } from "./constants/env";

const net = chains[NETWORK];
console.log({chains, net, NETWORK})
export const { publicClient, webSocketPublicClient } = configureChains(
  [net],
  [infuraProvider({apiKey: process.env.REACT_APP_INFURA_APIKEY})]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient
})

function ZeroDevWrapper({children}) {
  return (
    <WagmiConfig config={config}>
        {children}
    </WagmiConfig>
  )
}

export default ZeroDevWrapper