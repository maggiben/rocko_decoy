"use client"

import ZeroDevWrapper from "./ZerodevWrapper";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { NETWORK, THIRDWEB_CLIENTID } from "@/constants/env";

const ProviderNetwork = NETWORK === 'mainnet' ? 'ethereum' : NETWORK;

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ZeroDevWrapper>
            <ThirdwebProvider activeChain={ProviderNetwork} clientId={THIRDWEB_CLIENTID}>
                {children}
            </ThirdwebProvider>
        </ZeroDevWrapper>
    )
}