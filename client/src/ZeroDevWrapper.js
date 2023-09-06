import React from "react";
import {
  WagmiConfig,
  configureChains,
  createClient,
} from "wagmi";
import { publicProvider } from 'wagmi/providers/public'
import { goerli, mainnet } from 'wagmi/chains'
import { IS_DEMO_MODE } from "./constants/env";

const network = IS_DEMO_MODE ? goerli : mainnet;

const { provider, webSocketProvider } = configureChains(
  [network],
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