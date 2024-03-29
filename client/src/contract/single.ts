import { NETWORK } from '@/constants/env';
import { useProtocolConfig } from '@/protocols';

// eslint-disable-next-line import/prefer-default-export

const configs = {
  mainnet: 'compoundConfigMainnet',
  sepolia: 'compoundConfigSepolia',
  base: 'compoundConfigBase',
};

// eslint-disable-next-line import/prefer-default-export
export const useSingleLoan = () => {
  const currentSingleConfig: string = configs[NETWORK];
  const {
    [currentSingleConfig]: {
      getBorrowAPR,
      getETHPrice,
      getLTV,
      getThreshold,
      getPenalty,
      getBorrowBalanceOf,
      getCollateralBalanceOf,
      getRewardRate,
      getRewardAmount,
      tx: {
        addCollateral,
        addLoan,
        approveUSDC,
        approveWETH,
        borrowLoan,
        borrowCollateral,
        claimReward,
        deposit,
        depositZerodevAccount,
        getMinCollateral,
        getLiquidationPrice,
        getBuffer,
        wethToETH,
      },
    },
  } = useProtocolConfig();

  return {
    approveWETH,
    approveUSDC,
    deposit,
    wethToETH,
    addCollateral,
    addLoan,
    borrowLoan,
    borrowCollateral,
    getETHPrice,
    getBorrowAPR,
    getLTV,
    getThreshold,
    getPenalty,
    getCollateralBalanceOf,
    getBorrowBalanceOf,
    getRewardAmount,
    getRewardRate,
    getLiquidationPrice,
    getBuffer,
    getMinCollateral,
    claimReward,
    depositZerodevAccount,
  };
};
