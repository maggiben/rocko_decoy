/* eslint-disable no-unused-vars */
import { NetworkNames } from '@/constants/env';

type CollateralTokens = 'ETH' | 'WBTC' | 'UNI';
type RateType = 'floating' | 'fixed';
type LoanTerm = 'open' | 'fixed';

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
  getCollateralBalanceOf: () => Promise<number>;
  getBorrowBalanceOf: () => Promise<number>;
  getRewardAmount: () => Promise<number>;
  getRewardRate: () => Promise<number>;
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
