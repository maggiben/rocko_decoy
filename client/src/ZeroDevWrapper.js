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
  [infuraProvider({apiKey: 'f36f7f706a58477884ce6fe89165666c'})]
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