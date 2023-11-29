/* global BigInt */
import React, { useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import { parseBalance, getRoundDown } from '@/utility/utils';
import {
  usePrepareContractBatchWrite,
  useContractBatchWrite,
} from '@zerodev/wagmi';
import { useAddress } from '@thirdweb-dev/react';
import logger from '@/utility/logger';
import {
  USDCContract,
  CometContract,
  CometRewardContract,
  WETHContract,
  networkChainId,
} from '../constants';

const WETHABI = require('../constants/weth.json');
const COMETABI = require('../constants/comet.json');
const USDCABI = require('../constants/usdc.json');
const REWARDABI = require('../constants/reward.json');

const uintMax =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

export const useGetLoan = (collateral: any, loan: any) => {
  const { address: wagmiAddress } = useAccount();
  const address = useAddress();

  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState(false);

  const bigint_collateral = BigInt(
    ethers.utils.parseEther(collateral.toString()).toString(),
  );

  const { config } = usePrepareContractBatchWrite(
    wagmiAddress
      ? {
          calls: [
            {
              address: WETHContract[networkChainId],
              abi: WETHABI,
              functionName: 'deposit',
              args: [],
              value: bigint_collateral,
            },
            {
              address: WETHContract[networkChainId],
              abi: WETHABI,
              functionName: 'approve',
              args: [CometContract[networkChainId], uintMax],
            },
            {
              address: CometContract[networkChainId],
              abi: COMETABI,
              functionName: 'supply',
              args: [
                WETHContract[networkChainId],
                parseBalance(collateral.toString()),
              ],
            },
            {
              address: CometContract[networkChainId],
              abi: COMETABI,
              functionName: 'withdrawTo',
              args: [
                address || wagmiAddress,
                USDCContract[networkChainId],
                parseBalance(loan.toString(), 6),
              ],
            },
          ],
          enabled: true,
        }
      : {
          calls: [],
          enabled: true,
        },
  );

  const {
    sendUserOperation: batchGetLoan,
    data,
    error,
  } = useContractBatchWrite(config);

  useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data,
    onSuccess() {
      logger('Transaction was successful.', 'info');
      setSuccess(true);
      if (data?.hash) setTxHash(data?.hash);
    },
  });

  const executeBatchGetLoan = () => {
    if (batchGetLoan) batchGetLoan();
  };

  return { executeBatchGetLoan, batchGetLoan, success, txHash, error };
};

export const useRepaySome = (loan: any) => {
  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState(false);

  const { config } = usePrepareContractBatchWrite({
    calls: [
      {
        address: USDCContract[networkChainId],
        abi: USDCABI,
        functionName: 'approve',
        args: [CometContract[networkChainId], uintMax],
      },
      {
        address: CometContract[networkChainId],
        abi: COMETABI,
        functionName: 'supply',
        args: [USDCContract[networkChainId], parseBalance(loan.toString(), 6)],
      },
    ],
    enabled: true,
  });

  const {
    sendUserOperation: batchRepaySome,
    data,
    error,
  } = useContractBatchWrite(config);

  useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data,
    onSuccess() {
      logger('Transaction was successful.', 'info');
      setSuccess(true);
      if (data?.hash) setTxHash(data?.hash);
    },
  });

  const executeBatchRepaySome = () => {
    if (batchRepaySome) batchRepaySome();
  };

  return { executeBatchRepaySome, batchRepaySome, success, txHash, error };
};

export const useRepayFull = (
  collateral: any,
  loan: any,
  borrowBalanceOf: any,
) => {
  const { address: wagmiAddress } = useAccount();
  const address = useAddress();

  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState(false);

  const bigint_collateral = BigInt(
    ethers.utils.parseEther(collateral.toString()).toString(),
  );

  const { config } = usePrepareContractBatchWrite(
    wagmiAddress
      ? {
          calls: [
            {
              address: USDCContract[networkChainId],
              abi: USDCABI,
              functionName: 'approve',
              args: [CometContract[networkChainId], uintMax],
            },
            {
              address: CometContract[networkChainId],
              abi: COMETABI,
              functionName: 'supply',
              args: [
                USDCContract[networkChainId],
                parseBalance(loan.toString(), 6),
              ],
            },
            // {
            //   address: USDCContract[networkChainId],
            //   abi: USDCABI,
            //   functionName: 'transfer',
            //   args: [address, parseBalance(remaining, 6)],
            // },
            {
              address: CometContract[networkChainId],
              abi: COMETABI,
              functionName: 'withdraw',
              args: [
                WETHContract[networkChainId],
                parseBalance(collateral.toString()),
              ],
            },
            {
              address: WETHContract[networkChainId],
              abi: WETHABI,
              functionName: 'withdraw',
              args: [parseBalance(collateral.toString())],
            },
            {
              to: address as `0x${string}`,
              data: '0x',
              value: bigint_collateral,
            },
            {
              address: CometRewardContract[networkChainId],
              abi: REWARDABI,
              functionName: 'claimTo',
              args: [
                CometContract[networkChainId],
                wagmiAddress,
                address,
                true,
              ],
            },
          ],
          enabled: true,
        }
      : {
          calls: [],
          enabled: true,
        },
  );

  const {
    sendUserOperation: batchRepayFull,
    data,
    error,
  } = useContractBatchWrite(config);

  useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data,
    onSuccess() {
      logger('Transaction was successful.', 'info');
      setSuccess(true);
      if (data?.hash) setTxHash(data?.hash);
    },
  });

  const executeBatchRepayFull = () => {
    console.log(batchRepayFull);
    if (batchRepayFull) batchRepayFull();
  };

  return { executeBatchRepayFull, batchRepayFull, success, txHash, error };
};

export const useAddCollateral = (collateral: any) => {
  const { address: wagmiAddress } = useAccount();
  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState(false);

  const bigInt_collateral = BigInt(
    ethers.utils.parseEther(collateral.toString()).toString(),
  );

  const { config } = usePrepareContractBatchWrite(
    wagmiAddress
      ? {
          calls: [
            {
              address: WETHContract[networkChainId],
              abi: WETHABI,
              functionName: 'deposit',
              args: [],
              value: bigInt_collateral,
            },
            {
              address: WETHContract[networkChainId],
              abi: WETHABI,
              functionName: 'approve',
              args: [CometContract[networkChainId], uintMax],
            },
            {
              address: CometContract[networkChainId],
              abi: COMETABI,
              functionName: 'supply',
              args: [
                WETHContract[networkChainId],
                parseBalance(collateral.toString()),
              ],
            },
          ],
          enabled: true,
        }
      : {
          calls: [],
          enabled: true,
        },
  );

  const {
    sendUserOperation: batchAddCollateral,
    data,
    error,
  } = useContractBatchWrite(config);

  useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data,
    onSuccess() {
      logger('Transaction was successful.', 'info');
      setSuccess(true);
      if (data?.hash) setTxHash(data?.hash);
    },
  });

  const executeBatchAddCollateral = () => {
    if (batchAddCollateral) batchAddCollateral();
  };

  return {
    executeBatchAddCollateral,
    batchAddCollateral,
    success,
    txHash,
    error,
  };
};

export const useBorrowCollateral = (collateral: any) => {
  const { address: wagmiAddress } = useAccount();
  const address = useAddress();
  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState(false);

  const bigInt_collateral = BigInt(
    ethers.utils.parseEther(collateral.toString()).toString(),
  );

  const { config } = usePrepareContractBatchWrite(
    wagmiAddress && address
      ? {
          calls: [
            {
              address: CometContract[networkChainId],
              abi: COMETABI,
              functionName: 'withdraw',
              args: [
                WETHContract[networkChainId],
                parseBalance(collateral.toString()),
              ],
            },
            {
              address: WETHContract[networkChainId],
              abi: WETHABI,
              functionName: 'withdraw',
              args: [parseBalance(collateral.toString())],
            },
            {
              to: address as `0x${string}`,
              data: '0x',
              value: bigInt_collateral,
            },
          ],
          enabled: true,
        }
      : {
          calls: [],
          enabled: true,
        },
  );
  const {
    sendUserOperation: batchBorrowCollateral,
    data,
    error,
  } = useContractBatchWrite(config);

  useWaitForTransaction({
    hash: data?.hash,
    enabled: !!data,
    onSuccess() {
      logger('Transaction was successful.', 'info');
      setSuccess(true);
      if (data?.hash) setTxHash(data?.hash);
    },
  });

  const executeBatchBorrowCollateral = () => {
    if (batchBorrowCollateral) batchBorrowCollateral();
  };

  return {
    executeBatchBorrowCollateral,
    batchBorrowCollateral,
    success,
    txHash,
    error,
  };
};
