/* global BigInt */
import { useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import {
  usePrepareContractBatchWrite,
  useContractBatchWrite,
  // useSendUserOperation,
  // usePrepareSendUserOperation,
} from '@zerodev/wagmi';

import { useAddress } from '@thirdweb-dev/react';
// import { encodeFunctionData } from 'viem';
import { etherscanLink, parseBalance } from '@/utility/utils';
import logger from '@/utility/logger';
import transactionComp from '@/utility/transactionComp';
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

  const bigintCollateral = BigInt(
    ethers.utils.parseEther(collateral.toString()).toString(),
  );

  console.log('txs details', {
    networkChainId,
    bigintCollateral,
    address,
    wagmiAddress,
    txHash,
    success,
    weth: WETHContract[networkChainId],
    comet: CometContract[networkChainId],
    collateral: parseBalance(collateral.toString()),
  });

  // // // Prepare the tx
  // const { config: singleConfig } = usePrepareSendUserOperation({
  //   to: CometContract[networkChainId],
  //   data: encodeFunctionData({
  //     abi: COMETABI,
  //     functionName: 'supply',
  //     args: [WETHContract[networkChainId], BigInt('0x8bc10807903228')],
  //   }),
  //   value: bigintCollateral,
  // });

  // const {
  //   sendUserOperation: batchGetLoan,
  //   data,
  //   error,
  // } = useSendUserOperation(singleConfig);

  // // Wait on the status of the tx
  // useWaitForTransaction({
  //   hash: data?.hash,
  //   enabled: !!data,
  //   onSuccess(data) {
  //     console.log('Transaction was successful.', data?.transactionHash);
  //   },
  // });

  const depositApproveWETH = [
    {
      address: WETHContract[networkChainId],
      abi: WETHABI,
      functionName: 'deposit',
      args: [],
      value: bigintCollateral,
    },
    {
      address: WETHContract[networkChainId],
      abi: WETHABI,
      functionName: 'approve',
      args: [CometContract[networkChainId], uintMax],
    },
  ];

  const supplyWithdrawalToComp = [
    {
      address: CometContract[networkChainId],
      abi: COMETABI,
      functionName: 'supply',
      args: [WETHContract[networkChainId], parseBalance(collateral.toString())],
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
  ];
  console.log('calls', [...depositApproveWETH, ...supplyWithdrawalToComp]);
  const { config } = usePrepareContractBatchWrite(
    wagmiAddress
      ? {
          calls: [...depositApproveWETH, ...supplyWithdrawalToComp],
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
      setSuccess(true);
      if (data?.hash) {
        setTxHash(data?.hash);
        transactionComp({
          transactionHash: data?.hash,
        });
        logger(
          `Transaction was successful. ${etherscanLink(data?.hash)}`,
          'info',
        );
      }
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
      setSuccess(true);
      if (data?.hash) {
        setTxHash(data?.hash);
        transactionComp({
          transactionHash: data?.hash,
        });
        logger(
          `Transaction was successful. ${etherscanLink(data?.hash)}`,
          'info',
        );
      }
    },
  });

  const executeBatchRepaySome = () => {
    if (batchRepaySome) batchRepaySome();
  };

  return { executeBatchRepaySome, batchRepaySome, success, txHash, error };
};

export const useRepayFull = (collateral: any) => {
  const { address: wagmiAddress } = useAccount();
  const address = useAddress();

  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState(false);

  const bigintCollateral = BigInt(
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
              args: [USDCContract[networkChainId], ethers.constants.MaxUint256],
            },
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
              value: bigintCollateral,
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
      setSuccess(true);
      if (data?.hash) {
        setTxHash(data?.hash);
        transactionComp({
          transactionHash: data?.hash,
        });
        logger(
          `Transaction was successful. ${etherscanLink(data?.hash)}`,
          'info',
        );
      }
    },
  });

  const executeBatchRepayFull = () => {
    if (batchRepayFull) batchRepayFull();
  };

  return { executeBatchRepayFull, batchRepayFull, success, txHash, error };
};

export const useAddCollateral = (collateral: any) => {
  const { address: wagmiAddress } = useAccount();
  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState(false);

  const bigintCollateral = BigInt(
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
              value: bigintCollateral,
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
      setSuccess(true);
      if (data?.hash) {
        setTxHash(data?.hash);
        transactionComp({
          transactionHash: data?.hash,
        });
        logger(
          `Transaction was successful. ${etherscanLink(data?.hash)}`,
          'info',
        );
      }
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

  const bigintCollateral = BigInt(
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
              value: bigintCollateral,
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
      setSuccess(true);
      if (data?.hash) {
        setTxHash(data?.hash);
        transactionComp({
          transactionHash: data?.hash,
        });
        logger(
          `Transaction was successful. ${etherscanLink(data?.hash)}`,
          'info',
        );
      }
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
