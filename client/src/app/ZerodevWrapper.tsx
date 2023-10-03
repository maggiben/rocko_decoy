import React from "react";
import {
  WagmiConfig,
  configureChains,
  createConfig,
} from "wagmi";
import { infuraProvider } from 'wagmi/providers/infura'
import * as chains from 'wagmi/chains'
import { NETWORK, INFURA_APIKEY } from "../constants/env";

const net = (chains as { [key: string]: any })[NETWORK];
export const { publicClient, webSocketPublicClient } = configureChains(
  [net],
  [infuraProvider({apiKey: INFURA_APIKEY})]
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