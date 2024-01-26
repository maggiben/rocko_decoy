'use client';

import React from 'react';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Ethereum, Sepolia } from '@thirdweb-dev/chains';
import { BLOCKCHAIN, THIRDWEB_CLIENTID } from '@/constants/env';
import ZeroDevWrapper from './ZerodevWrapper';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ZeroDevWrapper>
      <ThirdwebProvider
        activeChain={BLOCKCHAIN}
        supportedChains={[Ethereum, Sepolia]}
        clientId={THIRDWEB_CLIENTID}
      >
        {children}
      </ThirdwebProvider>
    </ZeroDevWrapper>
  );
}
