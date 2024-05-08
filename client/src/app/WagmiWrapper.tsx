import { WagmiProvider, http, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base, mainnet, sepolia } from 'wagmi/chains';
import {
  ETH_NODE_URL_BASE,
  ETH_NODE_URL_MAINNET,
  ETH_NODE_URL_SEPOLIA,
} from '@/constants/env';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, base],
  transports: {
    [base.id]: http(ETH_NODE_URL_BASE),
    [mainnet.id]: http(ETH_NODE_URL_MAINNET),
    [sepolia.id]: http(ETH_NODE_URL_SEPOLIA),
  },
});

const queryClient = new QueryClient();

function WagmiWrapper({ children }: any) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default WagmiWrapper;
