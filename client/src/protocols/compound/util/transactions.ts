import { BigNumber, ethers } from 'ethers';
import { encodeFunctionData } from 'viem';
import {
  USDCContract,
  CometContract,
  CometRewardContract,
  WETHContract,
  networkChainId,
} from '@/constants';
import { Transaction } from '@/protocols/types';

const WETHABI = require('@/constants/weth.json');
const COMETABI = require('@/constants/comet.json');
const USDCABI = require('@/constants/usdc.json');
const REWARDABI = require('@/constants/reward.json');

const uintMax256 = ethers.constants.MaxUint256;

// Helper functions to build transactions
function createDepositApproveWETH(bigintCollateral: BigNumber): Transaction[] {
  return [
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
      value: BigNumber.from(0),
      data: encodeFunctionData({
        abi: WETHABI,
        functionName: 'approve',
        args: [CometContract[networkChainId], uintMax256],
      }),
    },
  ];
}

function createSupplyWithdrawalToComp(
  bigintCollateral: BigNumber,
  bigIntLoanAmount: BigNumber,
  address: string,
): Transaction[] {
  return [
    {
      to: CometContract[networkChainId],
      value: BigNumber.from(0),
      data: encodeFunctionData({
        abi: COMETABI,
        functionName: 'supply',
        args: [WETHContract[networkChainId], bigintCollateral],
      }),
    },
    {
      to: CometContract[networkChainId],
      value: BigNumber.from(0),
      data: encodeFunctionData({
        abi: COMETABI,
        functionName: 'withdrawTo',
        args: [address, USDCContract[networkChainId], bigIntLoanAmount],
      }),
    },
  ];
}

function createBorrowMore(
  bigIntLoanAmount: BigNumber,
  address: string,
): Transaction[] {
  return [
    {
      to: CometContract[networkChainId],
      value: BigNumber.from(0),
      data: encodeFunctionData({
        abi: COMETABI,
        functionName: 'withdrawTo',
        args: [address, USDCContract[networkChainId], bigIntLoanAmount],
      }),
    },
  ];
}

function createApproveUSDC(): Transaction[] {
  return [
    {
      to: USDCContract[networkChainId],
      value: BigNumber.from(0),
      data: encodeFunctionData({
        abi: USDCABI,
        functionName: 'approve',
        args: [CometContract[networkChainId], uintMax256],
      }),
    },
  ];
}

function createSupplyUSDC(amount: BigNumber): Transaction[] {
  return [
    {
      to: CometContract[networkChainId],
      value: BigNumber.from(0),
      data: encodeFunctionData({
        abi: COMETABI,
        functionName: 'supply',
        args: [USDCContract[networkChainId], amount],
      }),
    },
  ];
}

function createWithdrawComp(amount: BigNumber): Transaction[] {
  return [
    {
      to: CometContract[networkChainId],
      value: BigNumber.from(0),
      data: encodeFunctionData({
        abi: COMETABI,
        functionName: 'withdraw',
        args: [WETHContract[networkChainId], amount],
      }),
    },
  ];
}

function createWithdrawWETH(amount: BigNumber): Transaction[] {
  return [
    {
      to: WETHContract[networkChainId],
      value: BigNumber.from(0),
      data: encodeFunctionData({
        abi: WETHABI,
        functionName: 'withdraw',
        args: [amount],
      }),
    },
  ];
}

function createTransferETHToUser(
  amount: BigNumber,
  address: string,
): Transaction[] {
  return [
    {
      to: address as `0x${string}`,
      data: '0x',
      value: amount,
    },
  ];
}

function createCollectRewards(
  rockoWalletAddress: string,
  userAddress: string,
): Transaction[] {
  return [
    {
      to: CometRewardContract[networkChainId],
      value: BigNumber.from(0),
      data: encodeFunctionData({
        abi: REWARDABI,
        functionName: 'claimTo',
        args: [
          CometContract[networkChainId],
          rockoWalletAddress,
          userAddress,
          true,
        ],
      }),
    },
  ];
}

export {
  createDepositApproveWETH,
  createSupplyWithdrawalToComp,
  createBorrowMore,
  createApproveUSDC,
  createSupplyUSDC,
  createWithdrawComp,
  createWithdrawWETH,
  createTransferETHToUser,
  createCollectRewards,
};
