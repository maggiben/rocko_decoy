/* global BigInt */
import { useState } from 'react';
import { useAccount, useWaitForTransaction } from 'wagmi';
import { ethers } from 'ethers';
import {
  usePrepareContractBatchWrite,
  useContractBatchWrite,
} from '@zerodev/wagmi';
import { useAddress } from '@thirdweb-dev/react';
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
  console.log('Failing here now');
  const { address: wagmiAddress } = useAccount();
  const address = useAddress();

  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState(false);

  // TODO Sepolia.
  // const XXXcollateral = 0.041130385349850716;

  const bigintCollateral = BigInt(
    ethers.utils.parseEther(collateral.toString()).toString(),
  );

  // Are gas fees a problem on Sepolia? How do we max out?

  // probably collateral infinity again?
  console.log({ bigintCollateral, address, wagmiAddress, txHash, success });
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
    console.log({ batchGetLoan });
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
    console.log(batchRepayFull);
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
