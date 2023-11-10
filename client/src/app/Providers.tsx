"use client"

import ZeroDevWrapper from "./ZerodevWrapper";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { BLOCKCHAIN, THIRDWEB_CLIENTID } from "@/constants/env";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ZeroDevWrapper>
            <ThirdwebProvider activeChain={BLOCKCHAIN} clientId={THIRDWEB_CLIENTID}>
                {children}
            </ThirdwebProvider>
        </ZeroDevWrapper>
    )
}