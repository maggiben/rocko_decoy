/* eslint-disable import/prefer-default-export */
import axiosInterceptor from '@/utility/axiosInterceptor';
import { BACKEND_URL } from '@/constants/env';
import logger from '@/utility/logger';
import { ethers } from 'ethers';

// TODO modify when we have more collateral assets
const collateralAsset = 'eth';

export const useLoanDB = () => {
  const finalizeLoan = (
    user: string,
    transactionHash: string,
    lendingProtocol: string,
    loanActive: boolean,
    loanAsset: string,
    outstandingBalance: number,
    collateral: number,
    exist: boolean,
  ) => {
    // TODO update ui execution code and math to use wei, until displayed to user
    const collateralWei = ethers.utils.parseEther(collateral.toString());

    const loanObject = {
      user: user.toString(),
      transaction_hash: transactionHash,
      lending_protocol: lendingProtocol,
      loan_active: Number(loanActive),
      loan_asset: loanAsset,
      outstanding_balance: outstandingBalance,
      collateral: collateralWei,
      exist,
    };
    axiosInterceptor.post(`${BACKEND_URL}/add`, loanObject);
  };

  const updateLoan = (
    updateType: string,
    id: number,
    loan: number,
    active: boolean,
    collateral: number,
    interest: number,
    txHash: string,
  ) => {
    // TODO update ui execution code and math to use wei, until displayed to user
    const collateralWei = ethers.utils.parseEther(collateral.toString());
    const updateObject =
      updateType === 'repay'
        ? {
            updateType,
            id,
            loan_active: Number(active),
            outstanding_balance: loan,
            interest,
            transaction_hash: txHash,
          }
        : {
            updateType,
            id,
            collateral: collateralWei,
            transaction_hash: txHash,
          };
    axiosInterceptor.post(`${BACKEND_URL}/update`, updateObject);
  };

  const getLoanData = async (user: string) => {
    if (user) {
      try {
        const response = await axiosInterceptor.get(
          // TODO use request body for user data
          `${BACKEND_URL}/loans?user=${user}`,
        );

        // TODO update ui execution code and math to use wei, until displayed to user
        const weiValue = ethers.BigNumber.from(
          response.data.collateral.toString(),
        );

        const loanData = {
          ...response.data,
          collateral: ethers.utils.formatEther(weiValue),
        };

        return loanData;
      } catch (error) {
        logger(JSON.stringify(error, null, 2), 'error');
        return null;
      }
    }
  };

  const getAverageAPR = async (openDate: Date) => {
    try {
      const response = await axiosInterceptor.get(
        `${BACKEND_URL}/average_apr?openDate=${openDate}`,
      );
      return response.data.length > 0 ? response.data[0].average_apr : null;
    } catch (error) {
      logger(JSON.stringify(error, null, 2), 'error');
      return null;
    }
  };

  const getMonthAverageAPR = async () => {
    try {
      const response = await axiosInterceptor.get(
        `${BACKEND_URL}/average_apr?openDate=month`,
      );
      return response.data.length > 0 ? response.data[0].average_apr : null;
    } catch (error) {
      logger(JSON.stringify(error, null, 2), 'error');
      return null;
    }
  };

  const getThreeMonthAverageAPR = async () => {
    try {
      const response = await axiosInterceptor.get(
        `${BACKEND_URL}/average_apr?openDate=threemonth`,
      );
      return response.data.length > 0 ? response.data[0].average_apr : null;
    } catch (error) {
      logger(JSON.stringify(error, null, 2), 'error');
      return null;
    }
  };

  const getYearAverageAPR = async () => {
    try {
      const response = await axiosInterceptor.get(
        `${BACKEND_URL}/average_apr?openDate=year`,
      );
      return response.data.length > 0 ? response.data[0].average_apr : null;
    } catch (error) {
      logger(JSON.stringify(error, null, 2), 'error');
      return null;
    }
  };

  const getYearAvgRewardRate = async () => {
    try {
      const response = await axiosInterceptor.get(
        `${BACKEND_URL}/average_reward_rate?openDate=year`,
      );
      return response.data.length > 0
        ? response.data[0].average_reward_rate
        : null;
    } catch (error) {
      logger(JSON.stringify(error, null, 2), 'error');
      return null;
    }
  };

  const getRewardRate = async () => {
    try {
      const response = await axiosInterceptor.get(`${BACKEND_URL}/reward_rate`);
      return response.data.length > 0
        ? response.data[0].borrow_reward_rate
        : null;
    } catch (error) {
      logger(JSON.stringify(error, null, 2), 'error');
      return null;
    }
  };

  return {
    finalizeLoan,
    updateLoan,
    getLoanData,
    getAverageAPR,
    getMonthAverageAPR,
    getThreeMonthAverageAPR,
    getYearAverageAPR,
    getYearAvgRewardRate,
    getRewardRate,
  };
};
