// import { aaveConfig } from './aave';
/* eslint-disable import/prefer-default-export */
import { ethers } from 'ethers';
import { useSigner } from '@thirdweb-dev/react';
import * as chains from 'wagmi/chains';
import { NETWORK } from '@/constants/env';
import { FLAG_MULTI_CHAIN } from '@/constants/featureFlags';
import { useRockoAccount } from '@/hooks/useRockoAccount';
import { compoundConfig } from './compound';
import { ProtocolConfig } from './types';
import { CometContract } from '@/constants';

export const useProtocolConfig = (): ProtocolConfig[] => {
  const { address: rockoWalletAddress } = useRockoAccount();
  const signer: ethers.Signer | undefined = useSigner();

  // console.log({ rockoWalletAddress });

  const compoundConfigMainnet = compoundConfig({
    contract: CometContract[chains.mainnet.id],
    chain: 'mainnet',
    chainId: chains.mainnet.id,
    rockoWalletAddress,
    signer,
  });

  const compoundConfigBase = compoundConfig({
    contract: CometContract[chains.base.id],
    chain: 'base',
    chainId: chains.base.id,
    rockoWalletAddress,
    signer,
  });

  const compoundConfigSepolia = compoundConfig({
    contract: CometContract[chains.sepolia.id],
    chain: 'sepolia',
    chainId: chains.sepolia.id,
    rockoWalletAddress,
    signer,
  });

  // eslint-disable-next-line no-nested-ternary
  return NETWORK === 'mainnet'
    ? [compoundConfigMainnet]
    : FLAG_MULTI_CHAIN
      ? [compoundConfigBase, compoundConfigSepolia]
      : [compoundConfigSepolia];
};
