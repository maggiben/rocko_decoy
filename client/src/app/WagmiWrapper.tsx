import { WagmiProvider, http, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { base, mainnet, sepolia } from 'wagmi/chains';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [base.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(
      'https://eth-sepolia.g.alchemy.com/v2/Uh7mU3JjGqXM2Tzuup8CqhGraEyDy8hK',
    ),
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
