import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAddress } from '@thirdweb-dev/react';
import { encodeFunctionData } from 'viem';
import { parseUnits } from '@/utility/utils';
import {
  USDCContract,
  CometContract,
  CometRewardContract,
  WETHContract,
  networkChainId,
} from '@/constants';
import { useRockoWallet } from '@/hooks/useRockoWallet';
import { LoanData, PaymentMethods } from '@/types/type';
import { GetLoanReturn, Transaction, TransactionMode } from '@/protocols/types';
import { TokenAmount } from './data';
import {
  createDepositApproveWETH,
  createSupplyWithdrawalToComp,
  createBorrowMore,
  createApproveUSDC,
  createSupplyUSDC,
  createWithdrawComp,
  createWithdrawWETH,
  createTransferETHToUser,
  createCollectRewards,
} from './transactions';

const WETHABI = require('@/constants/weth.json');
const COMETABI = require('@/constants/comet.json');
const USDCABI = require('@/constants/usdc.json');
const REWARDABI = require('@/constants/reward.json');

const uintMax256 = ethers.constants.MaxUint256;

export const useGetLoan = (
  collateral: string,
  borrowing: string,
  loan: LoanData,
  mode: TransactionMode,
): GetLoanReturn => {
  const bigintCollateral = parseUnits(collateral.toString());
  const bigIntLoanAmount = parseUnits(borrowing.toString(), 6);
  const { rockoWalletClient, rockoWalletAddress } = useRockoWallet();
  const [txHash, setTxHash] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [address, setAddress] = useState(rockoWalletAddress);
  const metamaskAddress = useAddress();

  useEffect(() => {
    const addressToUse =
      loan.paymentMethod === PaymentMethods.ExternalWallet && loan.otherAddress
        ? loan.otherAddress
        : metamaskAddress;
    if (addressToUse && addressToUse !== address) setAddress(addressToUse);
  }, [rockoWalletAddress, loan, metamaskAddress, mode, address]);

  const transactionBuilder = useCallback(() => {
    const transactions: Transaction[] = [];
    if (!rockoWalletAddress || !rockoWalletClient) return transactions;
    switch (mode) {
      case TransactionMode.getLoan:
        transactions.push(
          ...createDepositApproveWETH(bigintCollateral),
          ...createSupplyWithdrawalToComp(
            bigintCollateral,
            bigIntLoanAmount,
            address,
          ),
        );
        break;
      case TransactionMode.borrowMore:
        transactions.push(...createBorrowMore(bigIntLoanAmount, address));
        break;
      case TransactionMode.repaySome:
        transactions.push(
          ...createApproveUSDC(),
          ...createSupplyUSDC(bigIntLoanAmount),
        );
        break;
      case TransactionMode.repayFull:
        transactions.push(
          ...createApproveUSDC(),
          ...createSupplyUSDC(uintMax256),
          ...createWithdrawComp(bigintCollateral),
          ...createWithdrawWETH(bigintCollateral),
          ...createTransferETHToUser(bigintCollateral, address),
          ...createCollectRewards(rockoWalletAddress, address),
        );
        break;
      default:
        break;
    }
    return transactions;
  }, [
    mode,
    bigintCollateral,
    bigIntLoanAmount,
    address,
    rockoWalletClient,
    rockoWalletAddress,
  ]);

  // Checking wallet availability after declaring hooks
  if (!rockoWalletClient || !rockoWalletAddress) {
    console.log('Waiting for Rocko Wallet Instance...');
    return {
      executeBatchTransactions: async () => null,
      success,
      txHash,
      error,
    };
  }

  const executeBatchTransactions = async () => {
    try {
      console.log('Sending transactions...');
      const transactions = transactionBuilder();
      const txCompleteHash = await rockoWalletClient.sendTransactions({
        transactions,
      });
      setTxHash(txCompleteHash);
      setSuccess(true);
      return txCompleteHash;
    } catch (e) {
      console.error(e);
      setSuccess(false);
      setError(e instanceof Error ? e : new Error('Unknown error occurred'));
      return null;
    }
  };

  return { executeBatchTransactions, success, txHash, error };
};

export const useRepaySome = (loan: number) => {
  const { rockoWalletClient } = useRockoWallet();
  const [txHash, setTxHash] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>(false);

  // prevent error if address or rockoWalletClient is undefined
  if (!rockoWalletClient) {
    console.log('Waiting for Rocko Wallet Instance...');
    return {
      executeBatchRepaySome: () => {
        console.log('Rocko wallet not available yet :(');
      },
      success,
      txHash,
      error,
    };
  }

  const executeBatchRepaySome = async () => {
    try {
      console.log('start repaysome');
      const txHash = await rockoWalletClient.sendTransactions({
        transactions: [
          {
            to: USDCContract[networkChainId],
            value: 0,
            data: encodeFunctionData({
              abi: USDCABI,
              functionName: 'approve',
              args: [CometContract[networkChainId], uintMax256],
            }),
          },
          {
            to: CometContract[networkChainId],
            value: 0,
            data: encodeFunctionData({
              abi: COMETABI,
              functionName: 'supply',
              args: [
                USDCContract[networkChainId],
                parseUnits(loan.toString(), 6),
              ],
            }),
          },
        ],
      });

      console.log('txHash ', txHash);
      setTxHash(txHash);
      setSuccess(true);
      setError(false);
    } catch (e) {
      console.log(e);
      setSuccess(false);
      setError(e);
    }
  };

  return { executeBatchRepaySome, success, txHash, error };
};

export const useRepayFull = (collateral: TokenAmount) => {
  console.log(
    { ...collateral, valueString: collateral.value.toString() },
    'useRepayFull',
  );
  const { rockoWalletClient, rockoWalletAddress } = useRockoWallet();
  const address = useAddress();

  const [txHash, setTxHash] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>(false);

  // prevent error if address or rockoWalletAddress is undefined
  if (!address || !rockoWalletAddress) {
    console.log('Waiting for Rocko Wallet Instance...');
    return {
      executeBatchRepayFull: () => {
        console.log('Rocko wallet not available yet :(');
      },
      getComp: () => {},
      getWeth: () => {},
      success,
      txHash,
      error,
    };
  }

  const approveSupplyUSDC = [
    {
      to: USDCContract[networkChainId],
      value: 0,
      data: encodeFunctionData({
        abi: USDCABI,
        functionName: 'approve',
        args: [CometContract[networkChainId], uintMax256],
      }),
    },
    {
      to: CometContract[networkChainId],
      value: 0,
      data: encodeFunctionData({
        abi: COMETABI,
        functionName: 'supply',
        args: [USDCContract[networkChainId], uintMax256],
      }),
    },
  ];

  const withdrawComp = [
    {
      to: CometContract[networkChainId],
      value: 0,
      data: encodeFunctionData({
        abi: COMETABI,
        functionName: 'withdraw',
        args: [WETHContract[networkChainId], collateral?.value],
      }),
    },
  ];
  // {
  //   address: CometContract[networkChainId],
  //   abi: COMETABI,
  //   functionName: 'withdraw',
  //   args: [
  //     WETHContract[networkChainId],
  //     parseUnits(collateral.toString()),
  //   ],
  // },

  const withdrawWETH = [
    {
      to: WETHContract[networkChainId],
      value: 0,
      data: encodeFunctionData({
        abi: WETHABI,
        functionName: 'withdraw',
        args: [collateral?.value],
      }),
    },
  ];
  // {
  //   address: WETHContract[networkChainId],
  //   abi: WETHABI,
  //   functionName: 'withdraw',
  //   args: [parseUnits(collateral.toString())],
  // },

  // console.log({
  //   withdrawComp,
  //   networkChainId,
  //   COMETABI,
  //   collateral: parseUnits(collateral?.formatted?.toString()),
  // });
  // console.log({
  //   withdrawWETH,
  //   networkChainId,
  //   WETHABI,
  //   collateral: parseUnits(collateral?.formatted?.toString()),
  // });

  // console.log({
  //   string: collateral.toString(),
  //   collateral,
  //   parse: parseUnits(collateral?.formatted?.toString()),
  // });

  const sendFromRockoToUserWallet = [
    {
      to: address as `0x${string}`,
      data: '0x',
      value: collateral?.value,
    },
  ];

  const collectRewards = [
    {
      to: CometRewardContract[networkChainId],
      value: 0,
      data: encodeFunctionData({
        abi: REWARDABI,
        functionName: 'claimTo',
        args: [
          CometContract[networkChainId],
          rockoWalletAddress,
          address,
          true,
        ],
      }),
    },
  ];

  const withdrawCollateralRewards = [
    ...approveSupplyUSDC,
    ...withdrawComp,
    ...withdrawWETH,
    ...sendFromRockoToUserWallet,
    ...collectRewards,
  ];

  const executeBatchRepayFull = async () => {
    try {
      const txHashRepayFull = await rockoWalletClient.sendTransactions({
        transactions: withdrawCollateralRewards,
      });
      // one by one txs for debugging
      // console.log('start repayfull', {
      //   address,
      //   rockoWalletAddress,
      //   bigintCollateral,
      // });
      // const txHashRepayFull = await rockoWalletClient.sendTransactions({
      //   transactions: [...approveSupplyUSDC],
      // });

      // console.log('√ txHash ', txHashRepayFull);

      // const txHash3 = await rockoWalletClient.sendTransactions({
      //   transactions: sendFromRockoToUserWallet,
      // });

      // console.log('√ txHash 3', txHash3);

      // const txHash4 = await rockoWalletClient.sendTransactions({
      //   transactions: collectRewards,
      // });

      // console.log('√ txHash 4', txHash4);

      // const txHash1 = await rockoWalletClient.sendTransactions({
      //   transactions: withdrawComp,
      // });

      // console.log('txHash 1', txHash1);

      // const txHash2 = await rockoWalletClient.sendTransactions({
      //   transactions: withdrawWETH,
      // });

      // console.log('txHash 2', txHash2);

      setTxHash(txHashRepayFull);
      setSuccess(true);
      setError(false);
    } catch (e) {
      console.log(e);
      setSuccess(false);
      setError(e);
    }
  };

  // const getComp = async () =>
  //   rockoWalletClient.sendTransactions({
  //     transactions: withdrawComp,
  //   });

  // const getWeth = async () =>
  //   rockoWalletClient.sendTransactions({
  //     transactions: withdrawWETH,
  //   });

  return {
    executeBatchRepayFull,
    // getComp,
    // getWeth,
    success,
    txHash,
    error,
  };
};

export const useAddCollateral = (collateral: number) => {
  const { rockoWalletClient } = useRockoWallet();
  const [txHash, setTxHash] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>(false);

  // prevent error if address or rockoWalletClient is undefined
  if (!rockoWalletClient) {
    console.log('Waiting for Rocko Wallet Instance...');
    return {
      executeBatchAddCollateral: () => {
        console.log('Rocko wallet not available yet :(');
      },
      success,
      txHash,
      error,
    };
  }

  const bigintCollateral = parseUnits(collateral.toString());

  const depositApproveWETH = [
    {
      to: WETHContract[networkChainId],
      value: bigintCollateral,
      data: encodeFunctionData({
        abi: WETHABI,
        functionName: 'deposit',
        args: [],
      }),
    },
    {
      to: WETHContract[networkChainId],
      value: 0,
      data: encodeFunctionData({
        abi: WETHABI,
        functionName: 'approve',
        args: [CometContract[networkChainId], uintMax256],
      }),
    },
  ];

  const supplyToComp = [
    {
      to: CometContract[networkChainId],
      value: 0,
      data: encodeFunctionData({
        abi: COMETABI,
        functionName: 'supply',
        args: [WETHContract[networkChainId], parseUnits(collateral.toString())],
      }),
    },
  ];

  const executeBatchAddCollateral = async () => {
    try {
      console.log('start add collateral');
      const txHash = await rockoWalletClient.sendTransactions({
        transactions: [...depositApproveWETH, ...supplyToComp],
      });

      console.log('txHash ', txHash);
      setTxHash(txHash);
      setSuccess(true);
      setError(false);
    } catch (e) {
      console.log(e);
      setSuccess(false);
      setError(e);
    }
  };

  return { executeBatchAddCollateral, success, txHash, error };
};

export const useBorrowCollateral = (collateral: number) => {
  const { rockoWalletClient } = useRockoWallet();
  const address = useAddress();

  const [txHash, setTxHash] = useState<any>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>(false);

  if (!rockoWalletClient || !address) {
    console.log('Waiting for Rocko Wallet Instance...');
    return {
      executeBatchBorrowCollateral: () => {
        console.log('Rocko wallet not available yet :(');
      },
      success,
      txHash,
      error,
    };
  }

  const bigintCollateral = parseUnits(collateral.toString());

  const executeBatchBorrowCollateral = async () => {
    try {
      console.log('start borrow collateral');
      const txHash = await rockoWalletClient.sendTransactions({
        transactions: [
          {
            to: CometContract[networkChainId],
            value: 0,
            data: encodeFunctionData({
              abi: COMETABI,
              functionName: 'withdraw',
              args: [
                WETHContract[networkChainId],
                parseUnits(collateral.toString()),
              ],
            }),
          },
          {
            to: WETHContract[networkChainId],
            value: 0,
            data: encodeFunctionData({
              abi: WETHABI,
              functionName: 'withdraw',
              args: [parseUnits(collateral.toString())],
            }),
          },
          {
            to: address as `0x${string}`,
            data: '0x',
            value: bigintCollateral,
          },
        ],
      });

      console.log('txHash ', txHash);
      setTxHash(txHash);
      setSuccess(true);
      setError(false);
    } catch (e) {
      console.log(e);
      setSuccess(false);
      setError(e);
    }
  };

  return { executeBatchBorrowCollateral, success, txHash, error };
};
