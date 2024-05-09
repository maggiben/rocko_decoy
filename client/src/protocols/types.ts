/* eslint-disable no-unused-vars */
import { NetworkNames } from '@/constants/env';
import { BigNumber } from 'ethers';
import { TokenAmount } from './compound/util/data';

type CollateralTokens = {
  ticker: 'ETH' | 'COMP' | 'WBTC' | 'UNI';
  fullName: string;
  icon: string;
  comingSoon: boolean;
};
type RateType = 'Floating' | 'Fixed';
type LoanTerm = 'Open-Ended' | 'Fixed';

export interface GetLoanReturn {
  executeBatchTransactions: () => Promise<string | null>;
  success: boolean;
  txHash: string;
  error: Error | null;
}

export interface Transaction {
  to: string;
  value: BigNumber;
  data: string;
}

export type ProtocolConfig = {
  name: string;
  url: string;
  description: string;
  chain: NetworkNames;
  collateral: CollateralTokens[];
  rateType: RateType;
  minBorrow: number;
  maxBorrow: number;
  loanTerm: LoanTerm;
  getETHPrice: () => Promise<number>;
  getBorrowAPR: () => Promise<number>;
  getLTV: () => Promise<number>;
  getThreshold: () => Promise<number>;
  getPenalty: () => Promise<number>;
  getCollateralBalanceOf: () => Promise<TokenAmount>;
  getBorrowBalanceOf: () => Promise<TokenAmount>;
  getRewardAmount: () => Promise<number>;
  getRewardRate: () => Promise<number>;
  getTotalBorrow: () => Promise<number>;
  getTotalSupply: () => Promise<number>;
  getUsdcBalance: () => Promise<string>;

  txBatch: {
    useGetLoan: (
      collateral: string,
      borrowing: string,
      loan: any,
      mode: 'borrowMore' | 'getLoan',
    ) => any;
    useRepaySome: (loan: any) => any;
    useRepayFull: (collateral: any) => any;
    useAddCollateral: (collateral: any) => any;
    useBorrowCollateral: (collateral: any) => any;
  };
  tx: {
    addCollateral: (amount: string | number) => Promise<any>;
    addLoan: (amount: string | number) => Promise<any>;
    approveWETH: () => Promise<any>;
    approveUSDC: () => Promise<any>;
    borrowLoan: (amount: string | number) => Promise<any>;
    borrowCollateral: (amount: string | number) => Promise<any>;
    claimReward: (address: string) => Promise<any>;
    deposit: (amount: string | number) => Promise<any>;
    depositZerodevAccount: (
      zerodevDepositAccount: string,
      amount: string | number,
      currency: string,
    ) => Promise<any>; // Promise<Omit<TransactionResultWithMetadata<unknown>, "data"> | null>
    getLiquidationPrice: (
      currentBalance: string | number,
      newCollateral: string | number,
    ) => Promise<string | number>;
    getBuffer: (
      currentBalance: string | number,
      newCollateral: string | number,
    ) => Promise<string | number>;
    getMinCollateral: (
      outstandingBalance: string | number,
    ) => Promise<string | number>;
    wethToETH: (amount: string | number) => Promise<any>;
  };
};
