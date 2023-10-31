import { Dispatch, SetStateAction } from "react";

export interface CoinCardProps {
  coinIcon: string;
  coinName: string;
  coinShortName: string;
  selectedCoin: string;
  handleSelect: Function;
  currentAPR?: number;
  loanToValue?: number; // data is  in percentage
  liquidationThreshold?: number; // data is in percentage
  liquidationPenalty?: number;
  collateralPrice?: number;
  subCollateralPrice?: number;
  liquidationPrice?: number;
  subLiquidationPrice?: number;
  isComingSoon?: boolean;
}

export interface AssetParameterProps {
  title?: string;
  value?: number;
  active?: boolean;
}
export interface LoanSteps {}
// Interface for currency step
export interface CurrencyStep {
  id?: number;
  title?: string;
  currency?: {
    id?: string;
    name?: string;
    fullName?: string;
    symbol?: string;
    currentAPR?: number;
    comingSoon?: boolean;
  }[];
  description?: string;
}

// Interface for asset step
export interface AssetStep {
  id?: number;
  title?: string;
  assets?: {
    id?: string;
    name?: string;
    fullName?: string;
    symbol?: string;
    loanToValue?: number;
    liquidationThreshold?: number;
    liquidationPenalty?: number;
    collateralPrice?: number;
    subCollateralPrice?: number;
    liquidationPrice?: number;
    subLiquidationPrice?: number;
    comingSoon?: boolean;
  }[];
  description?: string;
}

// Interface for protocol step
export interface ProtocolProps  {
  id?: string;
  name?: string;
  symbol?: string;
  interestRate?: number;
  selectProtocol?: string;
  handleProtocol?:Function;
  protocolInfos?: {
    id?: string;
    title?: string;
    tooltip?: string;
    options?: {
      name?: string;
      value?: number | string;
      subInfo?: string;
    }[];
  }[];
}
export interface ProtocolStep {
  id?: number;
  title?: string;
  protocols?: ProtocolProps[];
  description?: string;
}

// Interface for risk step
export interface RiskStep {
  id?: number;
  title?: string;
  risk?: {
    minRisk?: number;
    maxRisk?: number;
  };
  description?: string;
}

export interface LoanData {
  borrowing: number;
  protocol: string;
  currentAPR: number;
  coin: string;
  coinIcon: string;
  sixMonthInterest: number;
  twelveMonthInterest: number;
  twentyFourMonthInterest: number;
  paymentMethod: string;
  cryptoName:string;
  cryptoIcon: string;
  buffer: number;
  loanToValue: number;
  liquidationThreshold: number;
  liquidationPenalty: number;
  collateralPrice: number;
  subCollateralPrice: number;
  collateralNeeded: number;
  liquidationPrice: number;
  subLiquidationPrice: number;
  rewardRate: number;
  rewardAmount: number;
  activeNextButton?:boolean;
  nextValidation: any;
}
// ContextValues interface using the above step interfaces
export interface ContextValues {
  loanData: LoanData;
  setLoanData?: Dispatch<SetStateAction<LoanData>>;
  loanSteps: (CurrencyStep | AssetStep | ProtocolStep | RiskStep)[];
  currentStep: number;
  setCurrentStep?: Dispatch<SetStateAction<number>>;
}
