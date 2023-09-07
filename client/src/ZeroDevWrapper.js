import React from "react";
import {
  WagmiConfig,
  configureChains,
  createClient,
} from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import * as chains from 'wagmi/chains'
import { NETWORK } from "./constants/env";

const net = chains[NETWORK];
console.log({chains, net, NETWORK})
const { provider, webSocketProvider } = configureChains(
  [net],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

function ZeroDevWrapper({children}) {
  return (
    <WagmiConfig client={client}>
        {children}
    </WagmiConfig>
  )
}

export default ZeroDevWrapper