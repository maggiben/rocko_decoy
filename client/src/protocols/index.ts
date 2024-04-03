// import { aaveConfig } from './aave';
/* eslint-disable import/prefer-default-export */
import { ethers } from 'ethers';
import { useSigner } from '@thirdweb-dev/react';
import { useAccount } from 'wagmi';
import * as chains from 'wagmi/chains';
import { NETWORK } from '@/constants/env';
import { compoundConfig } from './compound';
import { ProtocolConfig } from './types';

export const useProtocolConfig = (): ProtocolConfig[] => {
  const { address: zeroDevAccount } = useAccount();
  const signer: ethers.Signer | undefined = useSigner();

  const compoundConfigMainnet = compoundConfig({
    contract: '0xc3d688B66703497DAA19211EEdff47f25384cdc3',
    chain: 'mainnet',
    chainId: chains.mainnet.id,
    zeroDevAccount,
    signer,
  });

  const compoundConfigBase = compoundConfig({
    contract: '0xb125E6687d4313864e53df431d5425969c15Eb2F',
    chain: 'base',
    chainId: chains.base.id,
    zeroDevAccount,
    signer,
  });

  const compoundConfigSepolia = compoundConfig({
    contract: '0xAec1F48e02Cfb822Be958B68C7957156EB3F0b6e',
    chain: 'sepolia',
    chainId: chains.sepolia.id,
    zeroDevAccount,
    signer,
  });

  return NETWORK === 'mainnet'
    ? [compoundConfigMainnet, compoundConfigBase]
    : [compoundConfigSepolia, compoundConfigBase];
};
