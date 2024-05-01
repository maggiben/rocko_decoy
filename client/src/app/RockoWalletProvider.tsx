import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { signerToEcdsaValidator } from '@zerodev/ecdsa-validator';
import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
} from '@zerodev/sdk';
import {
  walletClientToSmartAccountSigner,
  bundlerActions,
  ENTRYPOINT_ADDRESS_V07,
} from 'permissionless';
import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';
import { ZERODEV_PROJECT_ID } from '@/constants/env';

const BUNDLER_RPC = `https://rpc.zerodev.app/api/v2/bundler/${ZERODEV_PROJECT_ID}`;
const PAYMASTER_RPC = `https://rpc.zerodev.app/api/v2/paymaster/${ZERODEV_PROJECT_ID}`;
// TODO network switch
const chain = sepolia;
const entryPoint = ENTRYPOINT_ADDRESS_V07;

interface WalletProviderProps {
  children: React.ReactNode;
}

const WalletContext = createContext<any>(null);

export const useRockoWalletProvider = () => useContext(WalletContext);

export const RockoWalletProvider: React.FC<WalletProviderProps> = ({
  children,
}) => {
  const { primaryWallet } = useDynamicContext();
  const [dynamicWallet, setDynamicWallet] = useState(null);
  const [kernelClientZeroDev, setKernelClientZeroDev] = useState<any>({});
  const [bundlerClient, setBundlerClient] = useState(null);
  const [publicClient, setPublicClient] = useState<any>(null);

  useEffect(() => {
    const getDynamicWallet = async () => {
      const dynamicWalletClient: any =
        await primaryWallet?.connector?.getWalletClient();
      setDynamicWallet(dynamicWalletClient);
      // console.log(
      //   'useRockoWallet dynamicWalletClient',
      //   JSON.stringify(dynamicWalletClient, null, 2),
      // );

      if (dynamicWalletClient) {
        // console.log('useRockoWallet', { da: dynamicWalletClient.account });
        // Use the WalletClient from Dynamic to create a SmartAccountSigner
        const smartAccountSigner =
          walletClientToSmartAccountSigner(dynamicWalletClient);

        const signer = smartAccountSigner; // privateKeyToAccount(privateKey)

        // Construct a public client
        const publicClientViem = createPublicClient({
          transport: http(BUNDLER_RPC),
        });
        setPublicClient(publicClientViem);
        // Construct a validator
        const ecdsaValidator = await signerToEcdsaValidator(publicClientViem, {
          signer,
          entryPoint,
        });

        // Construct a Kernel account
        const account = await createKernelAccount(publicClientViem, {
          plugins: {
            sudo: ecdsaValidator,
          },
          entryPoint,
        });

        // Set up your Kernel client
        const kernelClient: any = createKernelAccountClient({
          account,
          chain,
          entryPoint,
          bundlerTransport: http(BUNDLER_RPC),
          middleware: {
            sponsorUserOperation: async ({ userOperation }) => {
              const zerodevPaymaster = createZeroDevPaymasterClient({
                chain,
                entryPoint,
                transport: http(PAYMASTER_RPC),
              });
              return zerodevPaymaster.sponsorUserOperation({
                userOperation,
                entryPoint,
              });
            },
          },
        });

        setKernelClientZeroDev(kernelClient);
        // console.log('useRockoWallet', { kernelClient });

        const bundlerClientInstance = kernelClient.extend(
          bundlerActions(entryPoint),
        );
        setBundlerClient(bundlerClientInstance);
      } else {
        console.log('useRockoWallet No dynamic wallet client found', {
          dw: JSON.stringify(dynamicWalletClient, null, 2),
        });
      }
    };

    if (primaryWallet) {
      getDynamicWallet();
    }
  }, [primaryWallet]);

  const walletContextValue = useMemo(
    () => ({
      publicClient,
      rockoWalletClient: kernelClientZeroDev,
      setKernelClientZeroDev,
      rockoWalletAddress: kernelClientZeroDev?.account?.address,
      bundlerClient,
      eoaWallet: dynamicWallet,
    }),
    [publicClient, kernelClientZeroDev, bundlerClient, dynamicWallet],
  );

  return (
    <WalletContext.Provider value={walletContextValue}>
      {children}
    </WalletContext.Provider>
  );
};
