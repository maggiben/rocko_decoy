import { useAccount } from 'wagmi';

// eslint-disable-next-line import/prefer-default-export
export const useRockoAccount = () => {
  console.log({ useAccount: useAccount() });
  const { address, isConnected } = useAccount();
  console.log('we only use. isConnected: boolean means we are logged in', {
    address, // rocko wallet address
    isConnected, // is logged in boolean
  });
  return { address, isConnected };
};
