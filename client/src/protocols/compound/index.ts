import { NetworkNames } from '@/constants/env';

import etherIcon from '@/assets/coins/Ether (ETH).svg';
import compoundIcon from '@/assets/coins/Compound (COMP).svg';
import uniswapIcon from '@/assets/coins/Uniswap (UNI).svg';
import wBitcoinIcon from '@/assets/coins/Wrapped Bitcoin (WBTC).svg';

import { ProtocolConfig, TransactionMode } from '../types';
import {
  approveWETH,
  addCollateral,
  addLoan,
  approveUSDC,
  borrowCollateral,
  borrowLoan,
  claimReward,
  deposit,
  depositZeroDevAccount,
  wethToETH,
} from './util';
import {
  getETHPrice,
  getBorrowAPR,
  getBorrowBalanceOf,
  getBuffer,
  getCollateralBalanceOf,
  getLTV,
  getLiquidationPrice,
  getMinCollateral,
  getPenalty,
  getRewardAmount,
  getRewardRate,
  getThreshold,
  getTotalBorrow,
  getTotalSupply,
  getUsdcBalance,
} from './util/data';

import {
  useAddCollateral,
  useBorrowCollateral,
  useGetLoan,
  useRepayFull,
  useRepaySome,
} from './util/batch';

const compoundConfig = ({
  chain,
  rockoWalletAddress,
  signer,
}: {
  // Comp USDC Contract cUSDCv3
  // See https://docs.compound.finance/#networks
  contract: string;
  chain: NetworkNames;
  chainId: number;
  rockoWalletAddress: any;
  signer: any;
}): ProtocolConfig => ({
  name: 'Compound',
  url: 'https://compound.finance',
  description:
    'Compound III is a popular lending protocol originally deployed on Ethereum in 2022. It allows users to borrow USDC at a floating interest rate — meaning the interest rate can change in real time based on market supply and demand.',
  chain,
  collateral: [
    { ticker: 'ETH', fullName: 'Ether', icon: etherIcon, comingSoon: false },
    {
      ticker: 'COMP',
      fullName: 'Compound',
      icon: compoundIcon,
      comingSoon: true,
    },
    {
      ticker: 'WBTC',
      fullName: 'Wrapped Bitcoin',
      icon: wBitcoinIcon,
      comingSoon: true,
    },
    { ticker: 'UNI', fullName: 'Uniswap', icon: uniswapIcon, comingSoon: true },
  ],
  rateType: 'Floating',
  minBorrow: 100,
  maxBorrow: 100000,
  loanTerm: 'Open-Ended',
  getETHPrice: async () => getETHPrice(chain),
  getBorrowAPR: async () => getBorrowAPR(chain),
  getTotalSupply: async () => getTotalSupply(chain),
  getTotalBorrow: async () => getTotalBorrow(chain),
  getUsdcBalance: async () => getUsdcBalance(chain),
  getLTV: async () => getLTV(chain),
  getThreshold: async () => getThreshold(chain),
  getPenalty: async () => getPenalty(chain),
  getCollateralBalanceOf: async () =>
    getCollateralBalanceOf({
      chain,
      rockoWalletAddress,
    }),
  getBorrowBalanceOf: async () =>
    getBorrowBalanceOf({
      chain,
      rockoWalletAddress,
    }),
  getRewardAmount: async () =>
    getRewardAmount({
      chain,
      rockoWalletAddress,
    }),
  getRewardRate: async () => getRewardRate(chain),
  txBatch: {
    useGetLoan: async (
      collateral: string,
      borrowing: string,
      loan: any,
      mode: TransactionMode,
    ) => useGetLoan(collateral, borrowing, loan, mode),
    useRepaySome: async (loan: any) => useRepaySome(loan),
    useRepayFull: async (collateral: any) => useRepayFull(collateral),
    useAddCollateral: async (collateral: any) => useAddCollateral(collateral),
    useBorrowCollateral: async (collateral: any) =>
      useBorrowCollateral(collateral),
  },
  tx: {
    addCollateral: async (amount: string | number) =>
      addCollateral({ amount, signer, chain }),
    addLoan: async (amount: string | number) =>
      addLoan({ amount, signer, chain }),
    approveWETH: async () => approveWETH({ signer, chain }),
    approveUSDC: async () => approveUSDC({ signer, chain }),
    borrowLoan: async (amount: string | number) =>
      borrowLoan({ amount, signer, chain }),
    borrowCollateral: async (amount: string | number) =>
      borrowCollateral({ amount, signer, chain }),
    claimReward: async (address: string) =>
      claimReward({ address, signer, chain }),
    deposit: async (amount: string | number) =>
      deposit({ amount, signer, chain }),
    depositZerodevAccount: async (
      zerodevDepositAccount: string,
      amount: string | number,
      currency: string,
    ) =>
      depositZeroDevAccount({
        zerodevDepositAccount,
        amount,
        currency,
        chain,
        signer,
      }),
    getBuffer: async (loan: string | number, collateral: string | number) =>
      getBuffer({ loan, collateral, chain }),
    getLiquidationPrice: async (
      loan: string | number,
      collateral: string | number,
    ) => getLiquidationPrice({ loan, collateral, chain }),
    getMinCollateral: async (loan: string | number) =>
      getMinCollateral({ loan, chain }),
    wethToETH: async (amount: string | number) =>
      wethToETH({ amount, signer, chain }),
  },
});

// eslint-disable-next-line import/prefer-default-export
export { compoundConfig };
