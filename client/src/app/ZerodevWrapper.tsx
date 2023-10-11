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

function ZeroDevWrapper({children} : any) {
  const [config] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return (
        createConfig({
          autoConnect: true,
          publicClient,
          webSocketPublicClient,
        })
      )
    }
  });

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (typeof window === 'undefined') return null

  return (
    <WagmiConfig config={config!}>
        {mounted && children}
    </WagmiConfig>
  )
}

export default ZeroDevWrapper