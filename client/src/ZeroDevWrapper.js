import React from "react";
import {
  WagmiConfig,
  configureChains,
  createClient,
} from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { goerli } from 'wagmi/chains'

const { provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()],
)

const client = createClient({
  autoConnect: false,
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