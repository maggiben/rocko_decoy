import axiosInterceptor from '@/utility/axiosInterceptor';
import { BACKEND_URL } from '@/constants/env';

export const useLoanDB = () => {
  const finalizeLoan = (
    user: string,
    transaction_hash: string,
    lending_protocol: string,
    loan_active: boolean,
    loan_asset: string,
    outstanding_balance: number,
    collateral: number,
    exist: boolean,
  ) => {
    const loanObject = {
      user,
      transaction_hash,
      lending_protocol,
      loan_active: Number(loan_active),
      loan_asset,
      outstanding_balance,
      collateral,
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
            collateral,
            transaction_hash: txHash,
          };
    axiosInterceptor.post(`${BACKEND_URL}/update`, updateObject);
  };

  const getLoanData = async (user: string) => {
    try {
      const response = await axiosInterceptor.get(
        // TODO use request body for user data
        `${BACKEND_URL}/loans?user=${user}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getAverageAPR = async (openDate: Date) => {
    try {
      const response = await axiosInterceptor.get(
        `${BACKEND_URL}/average_apr?openDate=${openDate}`,
      );
      return response.data.length > 0 ? response.data[0].average_apr : null;
    } catch (error) {
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
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
      console.error(error);
      return null;
    }
  };

  return {
    finalizeLoan,
    updateLoan,
    getLoanData,
    getAverageAPR,
    getMonthAverageAPR,
    getYearAverageAPR,
    getYearAvgRewardRate,
    getRewardRate,
  };
};
